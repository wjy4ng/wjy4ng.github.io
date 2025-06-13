---
emoji: 📝
title: 1. Markdown 파일 작성하기
date: '2025-04-01 11:00:00'
author: 양원준
tags: 블로그 github-pages gatsby
categories: github
---

## 📌 속성 설정
```
---
emoji: 🔮
title: Markdown 파일 작성하기
date: '2025-04-01 11:00:00'
author: 양원준
tags: 블로그 github-pages gatsby
categories: github
---
```

## 📌 마크다운 작성법
## 🔖 헤더

```
# This is a H1
## This is a H2
### This is a H3
#### This is a H4
##### This is a H5
###### This is a H6
```
> 결과 👇

# This is a H1
## This is a H2
### This is a H3
#### This is a H4
##### This is a H5
###### This is a H6



## 🔖 강조
```
*이탤릭체* or _이탤릭체_
**볼드체** or __볼드체__
~~취소선~~
```
> 결과 👇

*이탤릭체*
**볼드체**
~~취소선~~



## 🔖 리스트

```
1) 번호 x (모두 같은 결과)
* 리스트 1
- 리스트 2
+ 리스트 3

2) 번호 o
1. 리스트 1
2. 리스트 2
3. 리스트 3
```
> 결과 👇

1. 리스트 1
2. 리스트 2
3. 리스트 3



## 🔖 수평선
```
* * *
- - -
```
> 결과 👇

* * *
- - -



## 🔖 줄바꿈
```
줄바꿈을 하기 위해서는 문장 뒤에 \
를 붙이고 enter를 누른다 이렇게
```
> 결과 👇

줄바꿈을 하기 위해서는 문장 뒤에 \
를 붙이고 enter를 누른다 이렇게



## 🔖 인용문
```
> 인용문입니다.
>> 인용문 안 인용문입니다.
>>> 인용문 안 인용문 안 인용문입니다.
```
> 결과 👇

> 인용문입니다.
>> 인용문 안 인용문입니다.
>>> 인용문 안 인용문 안 인용문입니다.



## 🔖 표
```
(오류 시, 테이블 앞을 줄바꿈 처리)
| 왼쪽정렬 | 가운데정렬 | 오른쪽정렬 |
| :--- | :---: | ---: |
| 심교훈 | 수학 | 85 |
| 문태호 | 영어 | 90 |
| 황병일 | 국어 | 95 |
```
> 결과 👇

| 왼쪽정렬 | 가운데정렬 | 오른쪽정렬 |
| :--- | :---: | ---: |
| 심교훈 | 수학 | 85 |
| 문태호 | 영어 | 90 |
| 황병일 | 국어 | 95 |

## 🔖 인라인 코드
```
`인라인 코드는 이렇게`
```
> 결과 👇

`인라인 코드는 이렇게`

## 🔖 링크(Link)
```
URL 링크는 아래처럼
<https://wjy4ng.github.io/posts/main>
```
> 결과 👇

URL 링크는 아래처럼
<https://wjy4ng.github.io/posts/main>

## 🔖 이미지 링크
```
![이미지 설명](이미지 링크)
(ex) ![고양이애용](https://cdn.pixabay.com/photo/2019/03/13/08/29/cat-4052454_1280.jpg)
```

> 결과 👇

![고양이애용](https://cdn.pixabay.com/photo/2019/03/13/08/29/cat-4052454_1280.jpg)

## 🔖 체크 박스
```
- [ ] 운동하기
- [x] 강의듣기 
```
> 결과 👇

- [ ] 운동하기
- [x] 강의듣기

## 🔖 글자 색상
```
<span style="color:red">red</span>
<span style="color:#00ff00">#00ff00</span>
<span style="color:rgb(0,0,255)">blue</span>
```
> 결과 👇

<span style="color:red">red</span>\
<span style="color:#00ff00">green</span>\
<span style="color:rgb(0,0,255)">blue</span>

```toc
```