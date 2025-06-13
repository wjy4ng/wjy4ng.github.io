import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';
import './style.scss';

function PostCard({ post }) {
  const { id, slug, title, excerpt, date, categories, image } = post;
  const postImage = getImage(image);

  return (
    <div className="post-card-wrapper">
      <Link className="post-card" key={id} to={slug}>
        {postImage && <GatsbyImage className="post-card-image" image={postImage} alt={title} />}
        <div className="post-card-content">
          <div className="title">{title}</div>
          <div className="info">
            <div className="date">{date}</div>
            <div className="categories">
              {categories.map((category) => (
                <Link className="category" key={category} to={`/posts/${category}`}>
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PostCard;
