import React from 'react';
import PostCard from '../post-card';
import './style.scss';

function PostCardColumn({ posts }) {
  return (
    <div className="post-card-column-wrapper">
      <div className="post-card-column">
        {posts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      </div>
    </div>
  );
}

export default PostCardColumn;
