---
emoji: 🔮
title: 2. Git 기본 구조 및 명령어
date: '2025-04-02 08:00:00'
author: 양원준
tags: 블로그 github-pages gatsby
categories: github
---

## 📌 Github 구조
```
Working directory - Staging Area - Local Repository - Remote Repository
          -> git add       -> git commit       -> git push
```

## 📌 Github 개인정보 등록
```
git config --global user.name "계정 이름"		# 이름 설정
git config --global user.email "메일 주소"	# 메일 설정
git config --global --list			# 계정 확인
```

## 📌 브랜치 (branch)
> 동일한 소스에서 분산 작업을 하기 위한 여러 통로

```
git branch 						# 브랜치 리스트 확인
git fetch [branch] [local branch:local branch name]	# 브랜치 가져오기
git branch A 						# A라는 브랜치 생성
git checkout B 						# B라는 브랜치로 포커스 이동 (현재 A에 있다는 가정하에)
git merge B 						# B의 변동사항을 병합 (현재 A에 있다는 가정하에)
```
- - -

## 📌 Github 구동
```
bundle exec jekyll serve
```

## 📌 Github에 파일 업로드하기
```
git add .               	# git에 수정 파일 추가 (Working directory -> Staging area)
git commit -m "___"     	# commit할 내용 기입
git push [remote] [branch]  	# 업로드
```

```toc
```