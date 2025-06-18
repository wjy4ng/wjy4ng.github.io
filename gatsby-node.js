const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `content` });
    createNodeField({ node, name: `slug`, value: slug });
  }
};

const createBlogPages = ({ createPage, results }) => {
  const blogPostTemplate = require.resolve(`./src/templates/blog-template.js`);
  const edges = results.data.allMarkdownRemark.edges;

  // 1. 대표 카테고리별로 글을 그룹화
  const categoryMap = {};
  edges.forEach(({ node }) => {
    const categories = node.frontmatter.categories.split(' ');
    const mainCategory = categories[0];
    if (!categoryMap[mainCategory]) categoryMap[mainCategory] = [];
    categoryMap[mainCategory].push(node);
  });

  // 2. 각 글에 대해 대표 카테고리 기준으로 이전/다음 글 연결
  edges.forEach(({ node }) => {
    const categories = node.frontmatter.categories.split(' ');
    const mainCategory = categories[0];
    const postsInCategory = categoryMap[mainCategory];
    const idx = postsInCategory.findIndex(n => n.fields.slug === node.fields.slug);
    const prev = idx > 0 ? postsInCategory[idx - 1] : null;
    const next = idx < postsInCategory.length - 1 ? postsInCategory[idx + 1] : null;

    createPage({
      path: node.fields.slug,
      component: blogPostTemplate,
      context: {
        slug: node.fields.slug,
        nextSlug: next?.fields.slug ?? '',
        prevSlug: prev?.fields.slug ?? '',
      },
    });
  });
};

const createPostsPages = ({ createPage, results }) => {
  const categoryTemplate = require.resolve(`./src/templates/category-template.js`);
  const categorySet = new Set(['All']);
  const { edges } = results.data.allMarkdownRemark;

  edges.forEach(({ node }) => {
    const postCategories = node.frontmatter.categories.split(' ');
    postCategories.forEach((category) => categorySet.add(category));
  });

  const categories = [...categorySet];

  createPage({
    path: `/posts`,
    component: categoryTemplate,
    context: { currentCategory: 'All', edges, categories },
  });

  categories.forEach((currentCategory) => {
    createPage({
      path: `/posts/${currentCategory}`,
      component: categoryTemplate,
      context: {
        currentCategory,
        categories,
        edges: edges.filter(({ node }) => node.frontmatter.categories.includes(currentCategory)),
      },
    });
  });
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const results = await graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000) {
        edges {
          node {
            id
            excerpt(pruneLength: 500, truncate: true)
            fields {
              slug
            }
            frontmatter {
              categories
              title
              date(formatString: "MMMM DD, YYYY")
              image {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
          next {
            fields {
              slug
            }
          }
          previous {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  // Handle errors
  if (results.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  createBlogPages({ createPage, results });
  createPostsPages({ createPage, results });
};
