---
emoji: 🔮
title: 3. Github Blog 세팅
date: '2025-04-03 09:00:00'
author: 양원준
tags: 블로그 github-pages gatsby
categories: github
---

## 📌 깃허브 블로그 웹 호스팅
## 1. 깃허브 레포지토리 생성
> 깃허브 아이디만 있어도 개인 블로그를 만들 수 있다.\
아이디가 없다면 만드는 것을 추천한다.

```
깃허브 로그인 후 repository 생성
이름은 [아이디].github.io로 설정
Public, add README.md 체크
```

## 2. git clone 후 index.html 생성
> 내 터미널에 가져와서 작업하기 위함이다.

```
터미널에서 git clone [내 깃허브 주소]
```

## 3. 원격으로 호스팅 됐는지 확인
> 웹 호스팅이 정상적으로 적용됐는지 확인하기 위해 index.html로 테스트한다.

```
cd [내 깃허브 주소]
echo "hello world" > index.html
브라우저에 [아이디].github.io 입력
hello world 뜨면 성공
```

## 4. 레포에 push하기
> 변경사항을 repository에 적용한다.

```
git add .
git commit -m "Initial update"
git push origin main
```

## 📌 원격 호스팅 사이트 꾸미기
## 1. tool 설치
> 아직은 아무것도 없는 허전한 사이트이기 때문에, 다른 사람이 만든 템플릿을 활용해 꾸밀 예정이다.\
템플릿을 적용시키기 위해선 jekyll과 bundler가 필요하다.

```
gem install jekyll bundler      # jekyll, bundler 설치
jekyll new ./                   # jekyll 초기화
bundle install
bundle exec jekyll serve

브라우저에 localhost:4000와 wjy4ng.github.io 입력 후 변경됐는지 확인
성공하면 git push
```
> ‼️ 필자는 jekyll new ./ 에서 오류가 떴다.\
Conflict: /Users/yang-wonjun/git/wjy4ng.github.io exists and is not empty.\
Ensure /Users/yang-wonjun/git/wjy4ng.github.io is empty or else try again with `--force` to proceed and overwrite any files.
>> 해결 방법\
wjy4ng.github.io 폴더 내에 파일이 이미 있어서 나는 오류이다.\
파일 다 삭제하고 jekyll new ./


## 2. 테마 적용
> 사전 작업을 완료했다면 테마를 적용시킨다.

```
원하는 테마 Github 들어가서 Download ZIP
wjy4ng.github.io 폴더 안에 복붙

bundle install
git에 push
bundle exec jekyll serve 재시동
```

## 3. 블로그 정보 변경
> 내 블로그인 만큼 이미지와 설명을 수정해준다.

```
_config.yml 수정

lang: ko-KR
timezone: Asia/Seoul
title
tagline
url: "https://wjy4ng.github.io/"
github name
avatar: "/assets/img/profile.img.jpeg"
```
> ‼️ 필자는 여기서 새로고침을 해도 사이트에 적용되지 않는 오류를 인지했다.

```
bundle exec jekyll serve 실행 시,
Conflict: The following destination is shared by multiple files.
                    The written file may end up with unexpected contents.
                    /Users/yang-wonjun/git/wjy4ng.github.io/_site/404.html
                     - 404.html
                     - assets/404.html
                    
          Conflict: The following destination is shared by multiple files.
                    The written file may end up with unexpected contents.
                    /Users/yang-wonjun/git/wjy4ng.github.io/_site/about/index.html
                     - about.markdown
                     - /Users/yang-wonjun/git/wjy4ng.github.io/_tabs/about.md
                    
          Conflict: The following destination is shared by multiple files.
                    The written file may end up with unexpected contents.
                    /Users/yang-wonjun/git/wjy4ng.github.io/_site/index.html
                     - index.html
                     - index.markdown
```
> wjy4ng.github.io 폴더 내의 404.html, about.markdown, index.markdown 파일 삭제하면 된다.

> ‼️ 이 외에도 avatar 또한 바뀌지 않는다. 경로 설정이 잘못된걸까..

```toc
```