---
emoji: 📝
title: 이메일 변경으로 사라진 잔디 복구 방법
date: '2025-06-09 12:00:00'
author: 양원준
tags: 블로그 github-pages gatsby
categories: github
image: "./img/grass_img.png"
---

## 1. 로그 및 계정 확인
필자는 깃허브의 이메일을 gmail.com로 변경하고 기존 이메일인 naver.com을 삭제하였더니 최근에 진행한 커밋의 잔디들이 사라졌었다.
구글링한 결과, 다음 절차를 거치면 원복된다.

```bash
cd Tocky # Tocky는 Repo
git log
```

`git log`를 입력하면 author 정보가 뜨는데 필자는 이 정보가 저장소의 이메일/이름과 달라서 잔디가 복구가 되지 않았었다.
이 author 정보를 사용하는 이메일과 이름으로 전부 수정하면 된다.

기존에 사용하던 이메일과 이름을 설정해준다. 
`83898622+wjy4ng@users.noreply.github.com`은 github에서 제공하는 익명화된 이메일 주소이다.
```bash
git config --global user.name "wjy4ng"
git config --global user.email "83898622+wjy4ng@users.noreply.github.com"
```

---
## 2. 잔디 복구 작업
복구 작업을 하기 전에 `git pull`이나 `git clone`으로 레포를 다시 가져와야한다.
안전하게 덮어씌우기 위함이다.
```bash
git clone https://github.com/wjy4ng/Tocky.git
```

이제 아래 스크립트를 사용해서 일괄 처리 할 수 있다.
필자는 author 정보가 `양원준 <yang-wonjun@MacbookAir>`로 돼있었고, `wjy4ng <83898622+wjy4ng@users.noreply.github.com>` 로 수정해주었다.
```bash
git filter-repo --force \
--name-callback '
name_str = name.decode("utf-8")
if name_str == "양원준":
    return b"wjy4ng"
return name
' \
--email-callback '
email_str = email.decode("utf-8")
if email_str == "yang-wonjun@MacbookAir":
    return b"83898622+wjy4ng@users.noreply.github.com"
return email
'
```

---

## 3. 강제 커밋하여 완료
위 작업을 진행하면 `git remote`가 초기화 돼있을 것이다.
아래 명령어를 입력해 origin을 추가하고 push해주면 된다.
```bash
git remote -v # 아무것도 안뜨면 사라진 것
git remote add origin https://github.com/wjy4ng/Tocky.git
git remote -v # 확인용

cd ..
cp -r Tocky Tocky_backup # push를 강제로 하기 전에 레포를 복사해주는 것을 추천한다.

git push origin main --force
```

```toc
```