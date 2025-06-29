---
emoji: 🤖
title: Android에서 Java로 TOTP 구현하기
date: '2025-06-29 20:00:00'
author: 양원준
tags: 블로그 github-pages gatsby
categories: android
image: "./img/Android_img.jpg"
---

## 📌 TOTP란?
TOTP(Time-based One-Time Password)는 `2단계 인증(2FA)`에 자주 사용되는 인증 방식 중 하나이다. 사용자의 `비밀 키(secret key)`와 `현재 시간 정보`를 기반으로 일정 시간(보통 30초)마다 새로운 6자리 숫자 코드를 생성한다.

## 📌 왜 사용할까?
TOTP를 사용하는 이유는 다음과 같다.
1. 보안 강화
2. 일회용이기 때문에 유출되어도 재사용 불가
3. 서버와 사용자 기기 간의 동기화만 있으면 인터넷 없이 사용 가능
4. SMS보다 안전

## 📌 구현 방법
구현 방법은 `TOTP 라이브러리`를 사용하는 방식과 `수동 구현` 방식이 있다.<br>사용 IDE는 Android Studio이고, 사용 언어는 Java이다.

### 1. TOTP 라이브러리를 사용하는 방식
안드로이드에서 TOTP 라이브러리는 samstevens의 `DefaultCodeGenerator`를 사용한다. 이는 `HMAC-SHA1` 알고리즘을 사용한다.

```java
import dev.samstevens.totp.code.DefaultCodeGenerator;

// ...

public static String getCurrentTOTP(String secret){
    DefaultCodeGenerator generator = new DefaultCodeGenerator();

    // 30초마다 timeIndex를 설정
    long timeIndex = System.currentTimeMillis() / 1000 / 30;
    try{
        return generator.generate(secret, timeIndex);
    } catch (Exception e){
        e.printStackTrace();
        return null;
    }
}
```

### 2. 수동으로 구현하는 방식
다음은 수동으로 구현하는 방법이다. 구현을 위해서 필요한 라이브러리는 다음과 같다.
- Base32
- ByteBuffer
- Mac
- SecretKeySpec

base32Secret은 Android QR코드에서 추출하여 사용 가능하게 가공한 비밀키이다.

전체적인 흐름은 다음과 같다.
1. 현재 시간 구하기 (timeIndex)
2. 비밀키 디코딩 (Base32)
3. timeIndex를 8 byte로 변환
4. HMAC-SHA1 해시 계산 (Mac)
5. Dynamic Truncation (해시 결과의 일부 4 byte를 선택해 정수값(binary) 생성)
6. 6자리 OTP 만들기 (1_000_000)
7. 결과 반환

```java
import org.apache.commoncs.codec.binary.Base32;

import java.nio.ByteBuffer;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

// ...

public static String getCurrentTOTP2(String base32Secret){
    Base32 base32 = new Base32();
    long timeIndex = System.currentTimeMillis() / 1000 / 30;
    
    // base32 형태인 비밀 키를 byte 형태로 변환
    byte[] key = base32.decode(base32Secret);

    // timeIndex를 8비트로 변환
    byte[] data = ByteBuffer.allocate(8).putLong(timeIndex).array();

    try{
        Mac hmac = Mac.getInstance("HmacSHA1"); // HMAC 알고리즘 객체 생성
        SecretKeySpec keySpec = new SecretKeySpec(key, "HmacSHA1"); // 비밀키를 SecretKeySpec 형태로 래핑하여 HMAC에 전달 가능한 형태로 바꿈
        hmac.init(keySpec); // hmac 객체에 비밀키 설정

        byte[] hmacResult = hmac.doFinal(data); // 시간 데이터를 넣어 HMAC 해시를 계산

        /*
            1. 배열의 마지막 바이트의 하위 4비트값을 0x0f와 and하여 오프셋으로 사용
            2. 오프셋부터 4바이트를 조합
            3. 첫 바이트는 0x7f와 and하여 부호 제거 (첫자리를 0으로 만들어 양수 유지)
            4. 나머지는 0xff와 and하여 정수로 변환
        */
        int offset = hmacResult[hmacResult.length - 1] & 0x0F;
        int binary = ((hmacResult[offset] & 0x7f) << 24) |
                        ((hmacResult[offset+1] & 0xff) << 16) | // 0xff : 부호 제거/안전한 정수로 변환 역할
                        ((hmacResult[offset+2] & 0xff) << 8) |
                        (hmacResult[offset+3] & 0xff);

        int otp = binary % 1_000_000; // 6자리
        return String.format("%06d", otp); // String 으로 반환
    } catch (NoSuchAlgorithmException | InvalidKeyException e) {
        throw new RuntimeException(e);
    }
}
```

```toc
```
