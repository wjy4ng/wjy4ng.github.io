---
layout: post
title:  "[Full Stack] 1. Full Stack 개발하기 (React + Express)"
date: 2025-05-25 14:00:00 +/-TTTT
categories: [Full Stack]
tags: [Full Stack]
toc: true
---

##### 0. 폴더 구조
```bash
/full_stack
├── client/      ← React (create-react-app)
└── server/      ← Express (Node.js 백엔드)
```

##### 1. 풀스택 개발 환경 설정
```bash
mkdir full_stack
cd full_stack

# React 앱 만들기
npx create-react-app client

# Express 백엔드 만들기
mkdir server
cd server
npm init -y
npm install express cors
```

##### 2. 백엔드 서버 만들기
```js
// server/index.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // CORS 허용

app.get("/api/posts", (req, res) => {
  res.json([
    { id: 1, title: "첫 번째 글" },
    { id: 2, title: "두 번째 글" }
  ]);
});

app.listen(3001, () => {
  console.log("백엔드 서버 실행됨: http://localhost:3001");
});
```

##### 3. 프론트엔드에서 백엔드 호출
```js
// client/src/App.js
import { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts") // 상대 경로로 요청
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div>
      <h1>게시글</h1>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}

export default App;
```

##### 4. Proxy 설정
React가 /api/posts 요청시 자동으로 localhost:3001로 프록시해준다.
```json
// client/package.json 에 추가
"proxy": "http://localhost:3001",
```

##### 5. 실행 방법
```bash
# 백엔드 서버 실행
cd server
node index.js

# 다른 터미널에 프론트엔드 실행
cd ../client
npm start
```

##### 6. React를 Express로 빌드해서 통합 및 배포
빌드 이후엔 백엔드가 프론트까지 서빙하게 된다.
터미널에 node index.js만 입력하면 http://localhost:3001 입력시 창이 뜬다.
이후 개발중일땐 npm start, node index.js를 사용하고, 빌드 후엔 node index.js만 사용하면 된다.

```bash
# 빌드하면 client/build 폴더가 생긴다.
cd client
npm run build
```

```js
// server/index.js에 다음을 추가한다.
const path = require("path");

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
```