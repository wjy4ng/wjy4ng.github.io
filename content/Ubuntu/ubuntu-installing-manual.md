---
emoji: 📝
title: Ubuntu Server 설치 및 기본 세팅
date: '2025-07-05 18:00:00'
author: 양원준
tags: 블로그 github-pages gatsby
categories: Ubuntu
image: "./img/thumbnail.png"
---

## 1. ISO 이미지 다운로드
ubuntu server 공식 홈페이지에서 24.04 LTS 버전 iso 이미지 파일을 다운로드 받아준다. 추가로 이미지 파일을 구울 rufus 포터블 프로그램도 설치해준다.

두 파일을 다운받았다면 USB 연결 후, rufus로 iso를 구워준다. 굽는 방법은 아래에 링크를 참고하면 좋다.

[Rufus로 이미지 굽기](/Ubuntu/rufus-manual/)

집에 사용하지 않고 방치되어 있는 데스크탑이 하나 있어서 우분투 서버로 사용할 예정이다. USB를 넣고 바이오스 진입하여 부팅 우선순위를 우분투로 하여 설치를 진행한다.

---

## 2. 해상도 오류 해결
입맛에 맞게 설치를 끝냈으나 해상도가 너무 높아 글자가 작게 뜨는 현상이 있었다. 구글링해본 결과, grub 파일을 수정하고 재부팅해주면 해상도가 잘 보이게 돌아온다.

```bash
sudo vi /etc/default/grub

# 추가
GRUB_CMDLINE_LINUX_DEFAULT="quiet nomodeset"

:wq

sudo update-grub
sudo reboot
```

---

## 3. 네트워크 연결 방법
이제 패키지 업데이트를 할 것이다. 하지만 네트워크 연결이 되지 않아있다. 설치할 때 네트워크 연결을 건너뛰었기 때문이다. 이후에 세팅해줘도 상관없기 때문에 아래와 같이 진행한다.

```bash
cd /etc/netplan
ls -al # 아무 파일도 없으면 만들어야함
sudo vi 01-netcfg.yaml
```

```yaml
# 01-netcfg.yaml
# 들여쓰기는 꼭 스페이스로 해야함
network:
  version: 2
  ethernets:
    enp5s0:
      dhcp4: true
      nameservers:
        addresses: [8.8.8.8, 1.1.1.1]

:wq
```

```bash
sudo netplan apply

ip a # 하면 inet에 ip가 제대로 뜸
```

---

## 4. 패키지 업데이트
네트워크도 연결되었으니 이제 패키지 업데이트를 진행해준다.

```bash
sudo apt-get update && sudo apt-get upgrade -y
```

---

## 5. 중간 정리
중간 정리를 하자면 다음과 같다.

| 항목        | 상태                            |
| ----------- | ------------------------------- |
| OS          | Ubuntu Server 24.04 LTS         |
| 네트워크    | 정상 연결 확인                  |
| 패키지 목록 | 최신 상태로 갱신 완료           |
| 보안        | 아직 구성 필요 (방화벽, ssh 등) |
|             |                                 |
패키지 업데이트도 끝났고, 이제 사용자 입맛에 맞게 서버를 꾸며주려고 한다. 먼저, vi 설정부터 바꿔야겠다.

---

## 6. VIM 설정

```bash
sudo apt install vim # 기본적으로 깔려 있음

sudo vi ~/.vimrc
```

```vim
" ~/.vimrc

" ========== 기본 사용성 ==========
set nocompatible         " 오래된 vi 호환 모드 끄기
syntax on                " 구문 강조
set number               " 줄 번호 표시
set relativenumber       " 상대 줄 번호 표시 (선택)
set cursorline           " 현재 줄 강조

" ========== 들여쓰기 ==========
set tabstop=4            " 탭을 4칸으로 보이기
set shiftwidth=4         " 자동 들여쓰기 시 4칸
set expandtab            " 탭 누르면 스페이스로
set autoindent           " 자동 들여쓰기
set smartindent          " 문맥 기반 들여쓰기

" ========== 검색 ==========
set hlsearch             " 검색어 강조
set incsearch            " 입력 중 실시간 검색
set ignorecase           " 검색 대소문자 무시
set smartcase            " 대문자 입력하면 구분함

" ========== 편의 ==========
set clipboard=unnamedplus " 시스템 클립보드 공유 (GUI 환경이면)
set mouse=a               " 마우스 사용 가능 (터미널에서)
set backspace=indent,eol,start " 백스페이스 제약 해제
set scrolloff=5           " 커서 주변 여백
set wildmenu              " 탭 자동완성 메뉴

" ========== 파일 처리 ==========
set encoding=utf-8       " 파일 인코딩 UTF-8
set fileencoding=utf-8
set fileformats=unix,dos

" ========== 기타 ==========
set history=1000         " 명령어 히스토리 길이
set ruler                " 커서 위치 표시
set showcmd              " 명령 입력 시 표시
set nowrap               " 줄바꿈 안 함
```

---

## 7. CLI 한글 설정 이슈
GUI 환경이었으면 한글 폰트와 입력기를 세팅해주었겠지만, CLI 환경이어서 한글 입력은 되지 않는다. 그래서 그냥 영어로 사용하기로 했다.

그 다음은, 타임존 설정과 폰트 설정을 해주었다. 아래 명령어를 입력하면 설정창이 나온다.

```bash
sudo dpkg-reconfigure tzdata # timezone 설정
sudo dpkg-reconfigure locales # 폰트 설정
```

기본적인 세팅은 끝났다. 이제 웹 개발 관련 세팅을 해줄 것이다.
웹 개발 관련 세팅은 아래 블로그를 참고하면 좋다.

```toc
```