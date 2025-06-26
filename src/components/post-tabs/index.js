import React, { useMemo, useState, useEffect } from 'react';
import { Tabs, Tab } from '@mui/material';
import PostCardColumn from '../post-card-column';
import './style.scss';

const POSTS_PER_PAGE = 6;

function getIsDarkMode() {
  if (typeof window === 'undefined') return true;
  try {
    return JSON.parse(window.localStorage.getItem('isDarkMode')) ?? true;
  } catch {
    return true;
  }
}

function PostTabs({ tabIndex, onChange, tabs, posts }) {
  const tabPosts = useMemo(() => {
    if (tabs[tabIndex] === 'All') return posts;
    return posts.filter((post) => post.categories.includes(tabs[tabIndex]));
  }, [posts, tabs, tabIndex]);

  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const [isDarkMode, setIsDarkMode] = useState(getIsDarkMode());

  // 탭이 바뀌면 visibleCount를 6으로 초기화
  useEffect(() => {
    setVisibleCount(POSTS_PER_PAGE);
  }, [tabIndex]);

  // 테마 변경 감지
  useEffect(() => {
    const handler = () => setIsDarkMode(getIsDarkMode());
    window.addEventListener('theme', handler);
    return () => window.removeEventListener('theme', handler);
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + POSTS_PER_PAGE);
  };

  // 버튼 색상 분기
  const buttonStyle = isDarkMode
    ? {
        background: '#191919',
        color: '#fff',
      }
    : {
        background: '#f3f3f4',
        color: '#363f47',
        border: '1px solid #e0e0e0',
      };
  const buttonHoverStyle = isDarkMode ? '#080808' : '#e0e0e0';

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
            border: isDarkMode ? 'none' : '1px solid #e0e0e0',
            cursor: 'pointer',
            transition: 'background 0.2s',
            ...buttonStyle,
          }}
          onMouseOver={e => (e.currentTarget.style.background = buttonHoverStyle)}
          onMouseOut={e => (e.currentTarget.style.background = buttonStyle.background)}
        >
          더보기
        </button>
      )}
    </div>
  );
}
export default PostTabs;
