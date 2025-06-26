import React, { useMemo, useState, useEffect } from 'react';
import { Tabs, Tab } from '@mui/material';
import PostCardColumn from '../post-card-column';
import './style.scss';

const POSTS_PER_PAGE = 6;

function PostTabs({ tabIndex, onChange, tabs, posts }) {
  const tabPosts = useMemo(() => {
    if (tabs[tabIndex] === 'All') return posts;
    return posts.filter((post) => post.categories.includes(tabs[tabIndex]));
  }, [posts, tabs, tabIndex]);

  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  // 탭이 바뀌면 visibleCount를 6으로 초기화
  useEffect(() => {
    setVisibleCount(POSTS_PER_PAGE);
  }, [tabIndex]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + POSTS_PER_PAGE);
  };

  return (
    <div className="post-tabs-wrapper">
      <div className="post-tabs">
        <Tabs
          className="mui-tabs"
          value={tabIndex}
          onChange={onChange}
          variant="scrollable"
          scrollButtons="desktop"
        >
          {tabs.map((title, index) => (
            <Tab label={title} key={index} />
          ))}
        </Tabs>
      </div>
      <PostCardColumn
        posts={tabPosts.slice(0, visibleCount)}
      />
      {visibleCount < tabPosts.length && (
        <button
          onClick={handleLoadMore}
          style={{
            margin: '2rem auto',
            display: 'block',
            padding: '0.75rem 2rem',
            fontSize: '1rem',
            borderRadius: '8px',
            border: 'none',
            background: '#191919',
            color: '#fff',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onMouseOver={e => (e.currentTarget.style.background = '#080808')}
          onMouseOut={e => (e.currentTarget.style.background = '#191919')}
        >
          더보기
        </button>
      )}
    </div>
  );
}
export default PostTabs;
