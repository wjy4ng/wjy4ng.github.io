---
emoji: 📝
title: 맥북으로 홈 서버에 SSH 접속하기
date: '2025-07-05 18:02:00'
author: 양원준
tags: 블로그 github-pages gatsby
categories: Linux
image: "./img/ssh_thumbnail.png"
---

## 📌 초기 세팅
다른 PC에서 서버에 접속하기 위해 우분투 서버에서 ssh 서비스를 실행하고 방화벽을 활성화 해야한다. 참고로, 서버에 접속하기 위해선 집 와이파이나 회사 인터넷과 같이 서로 같은 네트워크 대역에 있어야한다.

필자의 경우 다음과 같다.
- 맥북: 서버에 접속하기 위한 집 와이파이로 연결된 노트북
- 데스크탑: 우분투 서버가 깔려있는 집 랜선에 연결된 PC

아래는 SSH를 설치하고 SSH의 대표적인 포트인 22번 포트를 활성화하는 방법이다.
```bash
# Ubuntu Server

sudo apt update

sudo apt install openssh-server
sudo systemctl enable ssh
sudo systemctl start ssh
sudo systemctl status ssh

sudo ufw allow ssh
sudo ufw enable
sudo ufw status
```

---

## 📌 SSH 접속 명령어
SSH에 접속하기 위한 방법은 다음과 같다.
- 우분투 서버에 접속하기 위해서 우선 라우터 공인 IP와 SSH 포트 번호를 알아야 한다.
- 만약 외부에서 접속할 경우, SSH 포트가 우분투 서버로 포트포워딩이 필요하다.
```bash
# Ubuntu Server

ip a # Ubuntu Server private IP
ssh wjy4ng@xxx.xxx.xxx.xxx -p 22 # Macbook
```

이 후 비밀번호를 입력하라는 메시지가 올라오고, 입력하면 정상적으로 접속이 되는 것을 볼 수 있을 것이다.

---

## 📌 SSH Key 로그인
이 서버는 본인을 제외한 다른 PC가 접속할 수 없는 것이 보안상 좋기 때문에 비밀번호가 아닌 SSH Key를 발급 받아 로그인을 시도해볼 것이다. ssh 키를 생성하고 이를 이용해 서버에 접속하고 싶다면 아래와 같이 진행한다.
```bash
# Macbook

# create to ssh public key
ssh-keygen

# copy public key to Ubuntu
ssh-copy-id ubuntu@xxx.xxx.xxx.xxx

# now you can login in without a password
ssh ubuntu@xxx.xxx.xxx.xxx
```

이러면 내 맥북에서 SSH Key를 이용해 서버에 접근이 가능하다.

---

## 📌 비밀번호 로그인 시도 막기
이제 내 맥북에서 key 로그인이 가능하니 key를 제외한 일반적인 비밀번호 로그인 시도를 막을 것이다. 그러면 key를 가지지 않은 PC는 접근 시도도 하지 못하게 된다.

그러기 위해선 우분투 서버에서 다음와 같이 마무리 설정을 해주면 된다.
```bash
# Ubuntu Server

sudo vi /etc/ssh/sshd_config

# 수정
PasswordAuthentication no
PubkeyAuthentication yes

:wq

# 적용
sudo systemctl restart ssh
sudo systemctl restart sshd
```

만약 비밀번호 로그인을 막아놨으나 로그인 시도가 된다던가, Key 로그인을 막아놨는데 된다면 우분투에서 설정이 적용이 되지 않은 것이다.
설정 파일에서 수정해도 적용이 되지 않는 상황인 것이다.

아래 명령어를 입력하면 현재 시스템에 반영된 결과가 무엇인지 알 수 있다. 만약 행이 중복 선언된 경우, 중복된 코드의 마지막 코드로 결정되기 때문에 중복 제거는 필수이다.
```bash
# Ubuntu Server

sudo sshd -T | grep pubkeyauthentication
sudo sshd -T | grep passwordauthentication
```

만약 `/etc/ssh/sshd_config`에서 설정했으나 결과가 다른경우 설정 파일 자체가 중복이 있거나 덮어씌워진 경우가 있을 수 있다. 그럴 때 사용하는 방식은 다음과 같다.
```bash
# Ubuntu Server

sudo grep -r PasswordAuthentication /etc/ssh

# result
/etc/ssh/ssh_config:# PasswordAuthentication yes
/etc/ssh/sshd_config:PasswordAuthentication no

...

/etc/ssh/sshd_config.d/50-cloud-init.conf:# PasswordAuthentication yes
```

다음을 보면 어떤 파일의 코드는 yes, 어떤 파일의 코드는 no로 되어 있다. 설정에 모순이 생긴 것인데 자신이 원하는 설정에 맞게 수정해주면 된다.

필자는 비밀번호 로그인 시도를 막을 것이니 yes를 no로 바꿔주었다.
```bash
#Ubuntu Server

sudo vi /etc/ssh/sshd_config.d/50-cloud-init.conf

# 주석처리 or 행 제거

:wq
```

이제, `ssh ubuntu@xxx.xxx.xxx.xxx`를 통한 비밀번호 로그인 시도는 거부될 것이다.

---

## 📌 내 PC만 포트 허용하기
로그인 시도에 더해 신뢰성 있는 PC를 제외한 다른 PC에선 접속을 할 수 없게 하려고 한다.

맥북만 ssh 접근할 수 있게 맥북의 IP만 22번 포트를 허용해주면 된다.
```bash
# Ubuntu Server

# xxx.xxx.xxx.xxx: Macbook Public IP
sudo ufw allow from xxx.xxx.xxx.xxx to any port 22

sudo ufw deny 22
sudo ufw status
```

이러면 IP가 일치하는 맥북만 22번 포트를 사용할 수 있다.

---

## 📌 SSH 접속 편하게 하기
현재는 매번 `ssh ubuntu@xxx.xxx.xxx.xxx`를 입력해주어야 하는 번거로움이 있다. 이를 이름을 지정하여 단순화할 수 있다. 예를 들어, `ssh myserver`와 같은 명령어를 입력하면 위 명령어와 동일한 기능을 하게 만들어보겠다.

```bash
# Macbook

sudo vi ~/.ssh/config # 없으면 만들기
```

```txt
" ~/.ssh/config

Host myserver
    HostName xxx.xxx.xxx.xxx " 서버 공인 IP
    User ubuntu              " 서버 사용자명
    IdentityFile ~/.ssh/id_rsa

:wq
```

```bash
ssh myserver
```

---

## 📌 마무리
홈 서버의 여러 기능은 현재 내 PC에서만 접근 가능하도록 제한하였다. 처음으로 구축한 서버인 만큼 다양한 테스트를 거칠 예정이며, 이에 따라 보안 설정도 철저히 점검할 계획이다. 향후에는 서버가 꺼져 있는 상태에서도 원격으로 부팅하고 SSH로 접속할 수 있는 기능을 구현한 뒤, 해당 내용을 블로그를 통해 공유할 예정이다.

```toc
```