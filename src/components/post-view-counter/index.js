import React, { useEffect, useState } from "react";

const PostViewCounter = ({ slug }) => {
  const [views, setViews] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const namespace = "wjy4ng-blog";
    const key = slug || "home";
    fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
      .then(res => res.json())
      .then(data => setViews(data.value))
      .catch(() => setError(true));
  }, [slug]);

  if (error) {
    return (
      <div style={{ marginTop: "2rem", textAlign: "right", color: "#888", fontSize: "0.95em" }}>
        조회수 정보를 불러올 수 없습니다.
      </div>
    );
  }

  return (
    <div style={{ marginTop: "2rem", textAlign: "right", color: "#888", fontSize: "0.95em" }}>
      조회수: {views !== null ? views : "로딩 중..."}
    </div>
  );
};

export default PostViewCounter; 