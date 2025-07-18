---
emoji: 📝
title: Commit 사용법
date: '2025-06-26 13:01:00'
author: 양원준
tags: 블로그 github-pages gatsby
categories: github
image: "./img/github_img.png"
---

## 📌 개요
보통 `git push`하기 전 커밋할 때 커밋 메시지를 작성하는데, 이 메시지를 어떤 식으로 작성하는게 좋을지 몰라 그냥 적는 경우가 있다. 이 커밋 메시지는 프로젝트의 전반적인 흐름을 볼 수 있는 만큼, 간단하고 체계적으로 작성해주는게 좋다. 그래야 나중에 수정이나 롤백이 수월하다.

---

## 📌 commit message 예시
1. `태그이름: 커밋 메시지` 방식
```bash
git commit -m "feat: A 기능 추가"
```

2. `태그이름(수정파일): 커밋 메시지` 방식
```bash
2 git commit -m "docs(profile): 프로필 주소 변경"
```

---

## 📌 commit message tag

| 태그이름         | 설명                                                  |
| ---------------- | ----------------------------------------------------- |
| Feat             | 새 기능 추가                                          |
| Fix              | 버그 수정                                             |
| Design           | CSS 등 사용자 UI 디자인 변경                          |
| !BREAKING CHANGE | 대규모 수정                                           |
| !HOTFIX          | 급하게 치명적인 버그를 고쳐야하는 경우                |
| Style            | 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우 |
| Refactor         | 코드 구조만 변경                                      |
| Comment          | 주석 추가 및 변경                                     |
| Docs             | 문서화                                                |
| Test             | 테스트 추가, 테스트 리팩토링                          |
| Chore            | 기타 사소한 변경, 설정 파일 업데이트                  |
| Create           | 새파일을 생성한 경우                                  |
| Rename           | 파일 혹은 폴더명을 수정, 옮기는 작업만인 경우         |
| Remove           | 파일을 삭제하는 작업만 수행한 경우                    |
| Build            | 컴파일 후 코드, 새로운 패키지 업데이트                |

---

## 📌 commit message 상세 내용 작성
commit message를 CLI 환경에서 작성할 땐, 상세 내용을 다음과 같이 두 가지 방식으로 작성할 수 있다. 먼저 한 줄로 작성하는 방식이다.
```bash
git commit -m "feat(button): 계정 삭제 버튼 추가" -m "계정을 삭제하면 ~~가 함께 삭제되는 기능을 추가하였다."
```
이는 간단한 상세내용을 적을때 유용하다.

다른 방식은 vi로 작성하는 방식이다. 아래 명령어를 입력하면 vi 편집창이 열린다.
```bash
git commit
```

```vi
# vi
feat(button): 계정 삭제 버튼 추가

계정을 삭제하면 ~~가 함께 삭제되는 기능을 추가하였다.
```
- 제목: 첫 번째 줄에 간결하게 작성한다.
- 본문: 제목 아래에 한 줄 띄고 본문을 작성한다. 여러 줄로 작성할 수 있다.

```toc
```