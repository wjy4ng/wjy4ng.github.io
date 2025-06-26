---
emoji: 📝
title: git push 충돌 시 해결 방법
date: '2025-06-26 13:02:00'
author: 양원준
tags: 블로그 github-pages gatsby
categories: github
image: "./img/github_img.png"
---

## 📌 git push 충돌이란?
깃 충돌(Git onflict)이 일어나는 원인은 `같은 파일의 같은 부분을 두 명(혹은 두 곳)에서 다르게 수정했을 때` 깃이 자동으로 어떤 게 맞는지 결정하지 못해서 발생한다.

---

## 📌 대표적인 충돌 발생 상황
1. 동일한 파일의 동일한 줄을 서로 다르게 수정
    - 예시:
        - A가 test.py의 5번째 줄을 "Hello"로 바꿈
        - B가 같은 줄을 "Hi"로 바꿈
        - 둘 다 커밋 후 push하면, 두 번째 사람이 push할 때 충돌 발생

2. 한쪽에서 파일을 수정/삭제, 다른 족에서 같은 파일을 수정
    - 한쪽은 파일을 삭제, 다른 쪽은 같은 파일을 수정 ➡️ 병합 시 충돌

3. 브랜치 병합(merge) 또는 pull/rebase 시
    - 내 로컬 브랜치와 원격 브랜치가 서로 다른 커밋을 가지고 있을 때
    - 특히, 같은 파일의 같은 부분이 다를 때

---

## 📌 왜 자동으로 해결이 안 되는 것인가?
- 깃은 "어떤 코드가 맞는지"를 모른다.
- 그래서 둘 다 보여주고(merge marker), 직접 골라서 수정해 달라고 사용자에게 맡긴다.

---

## 📌 충돌 테스트 및 해결 방법
1. 먼저 local repository에서 테스트 코드를 추가하여 push 해준다.

```python
# test.py
print("깃 충돌 테스트")
```

2. 그리고, 다른 사용자 또는 remote repository에서 추가 테스트 코드를 삽입해준다.
```python
# test.py
print("깃 충돌 테스트")
print("additional test")
```

3. 충돌 테스트를 위해 `local repository`에서 `git pull`을 하지 않은 채 코드를 수정해준다.
```python
# test.py
print("git conflict test")
```

4. 수정한 파일을 `git push`해주면 충돌 에러 메시지가 뜬다.

![[push_failed.png]]

5. `git fetch origin`으로 최신 변경사항 커밋을 가져온다.
6. `git merge origin/main`을 입력하여 병합해준다. 그럼 변경사항이 뜬다.
```python
현재 변경 사항 수락 | 수신 변경 사항 수락 | 두 변경 사항 모두 수락 | 변경 사항 비교
<<<<<<< HEAD (현재 변경 사항)

print("git conflict test")

=======

print("깃 충돌 테스트")

print("additional test")

>>>>>>> origin/main (수신 변경 사항)
```

7. 만약 `현재 변경 사항 수락 | ~` 부분이 뜬다면 원하는 방식을 클릭해주면 된다. 뜨지 않는다면 원하는 코드를 그대로 두고 `<<<<<<<`, `=======`, `>>>>>>>` 를 포함한 나머지를 지운다.

8. 이후 아래 명령을 입력해주면 성공적으로 푸시된다.
```bash
git add "수정된 파일"
git commit -m "커밋 메시지"
git push origin main
```

---

## 📌 충돌을 피하는 방법
- 자주 `git pull` 해서 최신 코드를 받아오고 작업하기
- 여러 명이 동시에 같은 파일, 같은 줄을 수정하지 않도록 협의하기
- 기능별로 브랜치를 나눠서 작업하고, 병합 전에 미리 충돌 확인하기

```toc
```