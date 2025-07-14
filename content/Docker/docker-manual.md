---
emoji: 📝
title: Docker란?
date: '2025-07-14 11:00:00'
author: 양원준
tags: 블로그 github-pages gatsby
categories: backend
image: "./img/docker_img.jpg"
---

## 📌 0. 개요
### 0.1. 도커를 사용하는 이유
도커를 사용하는 이유는 다음과 같다.
1. 환경 일치
    - 내 PC에선 되는데 서버에선 안 된다?
    - 도커를 사용하면 개발, 테스트, 배포 환경을 로컬환경과 똑같이 만들 수 있다.
2. 빠른 배포와 확장
    - 이미지를 한 번 만들어두면, 어디서든 동일하게 실행 가능하다.
    - 여러 서버에 빠르게 복제/확장이 가능하다.
3. 의존성 관리
    - python, node, java 등 각 프로젝트별로 독립된 환경을 제공한다.
    - 덕분에 패키지 충돌, 시스템 오염 걱정이 없다.

### 0.2. 도커의 작동 방식
1. 프로젝트에 Dockerfile을 작성한다.
1. `docker build`로 Image를 생성한다.
1. `docker run`으로 Container를 실행한다.
1. Container 안에서 내 앱이 동작한다.

---

## 📌 1. 파일 및 코드 설명
### 1.1. 파일 구조
```
lms-server/
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
├── docker-compose.yml
```

### 1.2. docker-compose.yml
```yml
services:
    web:
        build: ./backend
        command: python3 manage.py runserver 0.0.0.0:8000
        volumes:
            - ./backend:/backend
            - ./backend/db.sqlite3:/backend/db.sqlite3
        ports:
            - "8000:8000"
        environment:
            - DJANGO_SETTINGS_MODULE=backend.settings
            - DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1,.ngrok-free.app
```
- `services`:  여러 개의 컨테니어를 정의하는 시작점이다.
- `web`: web이라는 이름의 서비스를 정의한다. 원하는대로 설정 가능하다.
- `build`: `./backed` 폴더에 있는 Dockerfile을 사용해 이미지를 빌드한다.
- `command`: 컨테이너가 시작될 때 실행할 명령어이다.
- `volumes`: 로컬의 폴더를 컨테이너의 폴더로 마운트한다.
- `ports`: 컨테이너의 8000번 포트를 로컬 8000번 포트에 연결한다. 브라우저에서 `http://localhost:8000`으로 접속 가능하다.
- `environment`:
    - `DJANGO_SETTINGS_MODULE`: Django가 사용할 settings.py 위치를 지정한다.
    - `DJANGO_ALLOWED_HOSTS`: Django의 ALLOWED_HOSTS 설정을 환경변수로 전달한다.

### 1.3. Dockerfile
```dockerfile
FROM python:3.10

WORKDIR /backend

COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

COPY . .

ENV PYTHONUNBUFFERED=1
```
- `FROM`: Python 3.10이 미리 설치된 공식 이미지를 기반으로 새 컨테이너를 만든다.
- `WORKDIR`: 컨테이너 안에서 작업 디렉토리를 `/backend`로 설정한다. 이후의 모든 명령은 이 폴더에서 실행된다.
- `COPY`: 로컬의 requirements.txt 파일을 컨테이너의 `/backend` 디렉터리로 복사한다.
- `RUN`: 복사한 requirements.txt 에 적힌 모든 Python 패키지를 캐시 없이 컨테이너 안에 설치한다. 캐시를 남기지 않아 Docker 이미지 용량이 줄어든다.
- `ENV`: Python이 출력을 버퍼링하지 않고 바로바로 터미널에 출력하도록 환경변수를 설정한다. 로그가 실시간으로 보이게 하기 위해 사용된다.

### 1.4. requirements.txt
```txt
Django
django-cors-headers
python-dotenv
canvasapi
cryptography
...
```
- 사용한 패키지를 이곳에 적어두어 Docker 컨테이너 안에서 설치할 수 있도록 한다.

---

## 📌 2. 도커 이미지 빌드
```sh
docker build -t my-image:latest .
```
- 현재 디렉토리의 Dockerfile로 `my-image:latest`라는 이름의 이미지를 만든다.
- Dockerfile이 있는 경로에서 명령어를 입력해준다.

---

## 📌 3. 도커 컨테이너 실행
```sh
docker run -d -p 8000:8000 --name my-container my-image:latest
```
- `-d`: 백그라운드 실행
- `-p 8000:8000`: 호스트 8000포트 -> 컨테이너 8000포트 연결
- `--name my-container`: 컨테이너 이름 지정
- `my-image:latest`: 사용할 이미지

---

## 📌 4. 도커 Push, Pull
### 4.1. Docker Hub 로그인
```sh
docker login
```

### 4.2. 이미지에 태그 붙이기
```sh
docker tag my-image:latest yourdockerid/my-image:latest
```
- `yourdockerid`는 Docker Hub 아이디

### 4.3. 이미지 push
```sh
docker push yourdockerid/my-image:latest
```
- Docker Hub에 업로드

### 4.4. 이미지 pull
```sh
docker pull yourdockerid/my-image:latest
```
- 다른 서버/컴퓨터에서 이미지 다운로드

```toc
```