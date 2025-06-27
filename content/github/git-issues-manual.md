---
emoji: 📝
title: git issue 사용법
date: '2025-06-27 11:00:00'
author: 양원준
tags: 블로그 github-pages gatsby
categories: github
image: "./img/github_img.png"
---

## 📌 issue란
이슈(Issue)는 버그, 기능 요청, 질문, 작업 요청 등 프로젝트와 관련된 모든 "할 일"이나 "문제"를 기록하는 티켓이다. 각 이슈는 제목, 설명, 댓글, 담당자, 라벨, 마일스톤 등을 가질 수 있다.

---

## 📌 왜 필요할까?
### 1) 협업의 중심
- 여러 사람이 동시에 작업할 때, 무엇을 해야 하는지, 누가 담당하는지, 어떤 문제가 있는지 한눈에 파악할 수 있다.

### 2) 기록과 추적
- 버그, 요청, 아이디어, 질문 등 모든 이슈를 남겨두면 언제, 누가, 어떤 문제를, 어떻게 해결했는지 추적이 쉽다.

### 3) 코드와 연결
- 이슈 번호를 커밋 메시지, PR(풀리퀘스트)와 연결해서 "이 커밋/PR이 어떤 이슈를 해결하는지" 명확하게 관리할 수 있다.

### 4) 프로젝트 관리
- 라벨(버그, 기능, 문서 등), 마일스톤(버전, 일정) 등으로 작업 우선순위, 진행 상황을 체계적으로 관리할 수 있다.

---

## 📌 Github CLI(gh) 설치
gh는 터미널에서 깃허브의 다양한 기능을 명령어로 쓸 수 있게 해준다. 이슈, PR, 리뷰, Actions, Discussions 등 GitHub의 모든 기능을 웹사이트에 들어가지 않고도 터미널에서 바로 쓸 수 있다.

```bash
macOS  : brew install gh
Ubuntu : sudo apt-get install gh
```

---

## 📌 Github CLI 로그인
```bash
gh auth login
```
로그인 후, 브라우저에서 인증을 마친 후 CLI에서 사용 가능하다.

---

## 📌 이슈 생성 (Create Issue)
```bash
gh issue create --title "버그 수정" --body "로그인 버튼 클릭 시 앱이 크래시되는 문제 수정 필요" --assignee @사용자이름 --label "bug"
```
- `--title`: 이슈의 제목
- `--body`: 이슈의 상세 내용
- `--assignee`: 특정 사용자에게 이슈 할당
- `--label`: 특정 라벨 생성

---

## 📌 이슈 목록 조회 (List Issues)
```bash
gh issue list --state open --label bug
```
- `--state`: `open`, `closed`, `all`로 상태를 필터링
- `--label`: 특정 라벨로 필터링
- `--assignee`: 특정 사용자에게 할당된 이슈만 보기

---

## 📌 이슈 상세 조회 (View Issue)
```bash
gh issue view 1 --web
```
위 명령어는 이슈 번호 1에 대한 상세 내용을 보여준다.
옵선 `--web`을 추가하면 웹 브라우저에서 이슈를 열 수 있다.

---

## 📌 이슈 수정 (Edit Issue)
```bash
gh issue edit 1 --title "수정된 제목" --body "이슈의 수정된 내용"

gh issue edit 1 --label "enhancement" --assignee @사용자이름
```

---

## 📌 이슈 닫기 (Close Issue)
```bash
gh issue close 1
```

---

## 📌 이슈 재열기 (Reopen Issue)
```bash
gh issue reopen 1
```

---

## 📌 이슈에 댓글 달기 (Comment on Issue)
```bash
gh issue comment 1 --body "이 문제는 제가 수정하겠습니다."
```

---

## 📌 이슈에서 작업 완료하기 (Close Issue with Commit)
커밋 메시지에 `fixes` 또는 `closes` 키워드를 사용하면 커밋 후 자동으로 이슈가 닫힌다.
```bash
git commit -m "버그 수정 완료. fixes #1"
```

```toc
```