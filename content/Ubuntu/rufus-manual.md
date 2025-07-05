---
emoji: 📝
title: Rufus로 ISO 이미지 굽기
date: '2025-07-05 18:01:00'
author: 양원준
tags: 블로그 github-pages gatsby
categories: Ubuntu
image: "./img/thumbnail.png"
---

## Rufus란?
Rufus는 부팅 가능한 USB 드라이브(설치 USB)를 만드는 무료 프로그램이다. 주로 윈도우나 리눅스 설치용 USB를 만들 때 사용한다. 공식 사이트는 http://rufus.ie/ 이다.

---

## ISO 파일을 USB에 굽는 방법
필자는 `Ubuntu Server 24.04 LTS`를 다운받아두었다.
준비물은 다음과 같다.
- Windows PC
- USB 메모리 (8GB 이상 권장, 안의 데이터는 모두 지워진다.)
- ISO 파일 (Ubuntu Server)

1. 장치
    - 장치는 USB 드라이브가 자동으로 선택된다.

2. 부트 선택
    - 선택 버튼을 클릭 후 준비한 ISO 파일을 선택한다.

3. 파티션 방식
    - MBR과 GPT가 있는데, 대부분의 최신 PC는 GPT(UEFI 부팅)이다. 구형 PC나 BIOS 부팅은 MBR을 선택한다.
    - 필자는 BIOS로 부팅하기 때문에 MBR을 선택하였다.
    - 자신의 PC가 UEFI인지 BIOS인지 모르겠다면 확인하는 방법은 다음과 같다.
    - `Win + R -> msinfo32 입력 -> 시스템 정보 창 열기`

4. 파일 시스템
    - 기본값(FAT32) 그대로 두면 된다.

5. 볼륨 레이블
    - USB 이름을 원하는 대로 지정한다.

이제 구워주면 된다. 다 구워지면 USB를 분리하여 부팅할 PC에 꽂아주면 된다.

---

## USB로 부팅하기
USB를 부팅할 PC에 꽂고 전원을 키면서 부트 메뉴(F12, F2, ESC, DEL 등) 키를 눌러 USB로 부팅하면 설치 화면이 나온다.

---

## 정리
정리를 하자면 다음과 같다.
1. Rufus 다운로드 및 실행
2. USB 연결
3. ISO 파일 선택
4. 파티션/파일시스템 등 설정
5. 시작 -> 완료 후 USB로 부팅

```toc
```