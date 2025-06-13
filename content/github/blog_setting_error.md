---
emoji: 📝
title: "---layout: home # Index page --- 오류 해결방법"
date: '2025-04-04 10:00:00'
author: 양원준
tags: 블로그 github-pages gatsby
categories: github
---

## 📌 문제상황
> jekyll chirpy를 fork해서 끌어오고, url=“https://wjy4ng.github.io”로 바꿨으나\
url 접속시 — layout: home # Index page — 가 뜸.

## 📌 해결방법
## 1. __config.yml 수정하기
```
// __config.yml
url: "https://[사용자닉네임].github.io"
```
> 그러나 필자는 config 파일을 수정해도 해결되지 않았다.

## 2. Build and Deployment 설정 변경하기
```
본인 깃허브 레포지토리에서 setting > pages > Build and Deployment 에서
Deploy from a branch로 되어있는 설정을 Github Actions로 변경해준다.
```
> 아직은 똑같았다.

## 3. 플랫폼 목록 업데이트 후 커밋하기
```
본인의 Local OS가 linux가 아닐 경우, repository root directory에서
bundle lock --add-platform x86_64-linux 명령어 입력하여 commit 전,
platform 목록을 수동으로 업데이트한다.

그러면 Gemfile.lock 파일이 생성된다. 이후 주소로 접속한다.
```
```toc
```