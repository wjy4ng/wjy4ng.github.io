---
emoji: 📝
title: Branch 사용법
date: '2025-06-26 13:00:00'
author: 양원준
tags: 블로그 github-pages gatsby
categories: github
image: "./img/github_img.png"
---

## 📌 브랜치란?
브랜치란, Git 저장소에서 커밋의 흐름(이력)을 분기해서 여러 작업을 동시에 독립적으로 진행할 수 있게 해주는 기능이다. 나뭇가지(branch)처럼 한 줄기에서 여러 갈래로 뻗어나가고, 다시 합칠 수도 있다.

---

## 📌 왜 쓸까?
- 여러 사람이 동시에 다른 작업 할 때 서로의 작업이 충돌하지 않도록 분리해서 작업할 수 있다.
- 메인(main/master) 브랜치는 항상 안정적으로 유지하고, 새로운 기능은 별도의 브랜치에서 개발 후, 검토/테스트가 끝나면 메인 브랜치에 병합(merge)한다.

---

## 📌 브랜치 생성
```bash
1 git branch "브랜치명" # 브랜치 생성
  git checkout "브랜치명" # 브랜치 전환

2 git checkout -b "브랜치명" # 브랜치 생성 및 전환 1

3 git switch -C develop # 브랜치 생성 및 전환 2
```
일반적인 생성 및 전환 방식과 checkout, switch 총 세 가지 방식이 있다.
여기선 `"브랜치명"`을 `develop`으로 명시하겠다.
`-b`와 `-C`는 브랜치 생성 후 자동으로 브랜치를 변경하는 옵션이다. 수동으로 브랜치를 변경하고 싶다면 `git checkout "브랜치명"`을 입력하면 된다.

---

## 📌 작업 후 커밋
main 브랜치는 그대로 두고 생성된 develop 브랜치에 커밋한다.
```bash
git add .
git commit -m "fix: 계정 삭제 버튼 코드 수정"
git push origin develop
```

---

## 📌 merge 방법
develop 브랜치의 수정사항을 main에 추가하려면 main에서 `git merge`하면 된다.

```bash
# main 브랜치로 변경
git switch main

# 변경사항 가져오기 (main의 경우 변경사항 없지만 해주는게 좋다)
git pull origin main

# 병합 후 푸시
git merge develop
git push origin main
```
main 브랜치에서 develop을 merge해주면 파일이 추가되고, 이후 push를 해야 원격 저장소에 저장된다.

---

## 📌 브랜치 삭제
```bash
git branch -D develop # 로컬 저장소의 브랜치 삭제
git push origin --delete develop # 원격 저장소의 브랜치 삭제
```
보통 로컬의 브랜치는 냅두고, 작업이 끝난 원격의 브랜치는 삭제하는 게 원칙이다.

```toc
```
