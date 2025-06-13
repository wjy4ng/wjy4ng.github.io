---
emoji: 🤖
title: 1. Android Studio로 로그인/회원가입 구현 (SQLite)
date: '2025-04-02 19:00:00'
author: 양원준
tags: 블로그 github-pages gatsby
categories: android
image: "./main_tab_2.png"
---
## 📌 sqlite3 데이터베이스 구축 방법
> 앞으로 안드로이드 스튜디오에서 DBHelper를 활용해 계정 정보를 아래 DB로 가져올 예정이다.

```
adb root
adb shell
cd data/data/com.cookandroid.[프로젝트 이름]
mkdir databases
cd databases
sqlite3 [데이터베이스 이름]
```

## 📌 SignupActivity.java 파일
```java
package com.cookandroid.mobile_project;
import android.content.ContentValues;
import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

import com.cookandroid.mobile_project.database.DBHelper;

public class SignupActivity extends AppCompatActivity {
    private SQLiteDatabase database;
    private DBHelper dbHelper;
    private EditText emailEditText, passwordEditText, confirmPasswordEditText;
    private Button signupCompleteButton;
    private ImageButton btn_backspace;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup);

        // 뷰 초기화
        emailEditText = findViewById(R.id.emailEditText);
        passwordEditText = findViewById(R.id.passwordEditText);
        confirmPasswordEditText = findViewById(R.id.confirmPasswordEditText);
        signupCompleteButton = findViewById(R.id.signupButton);
        btn_backspace = findViewById(R.id.btn_backspace);

        // DBHelper 초기화
        dbHelper = new DBHelper(this);

        signupCompleteButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // 회원가입 기능 (간단한 예시)
                String email = emailEditText.getText().toString();
                String password = passwordEditText.getText().toString();
                String confirmPassword = confirmPasswordEditText.getText().toString();

                // 유효성 검사
                if (email.isEmpty() || password.isEmpty() || confirmPassword.isEmpty()){
                    Toast.makeText(SignupActivity.this, "모든 필드를 채워주세요.", Toast.LENGTH_SHORT).show();
                    return;
                }
                if (!password.equals(confirmPassword)){
                    Toast.makeText(SignupActivity.this, "비밀번호가 일치하지 않습니다.", Toast.LENGTH_SHORT).show();
                    return;
                }

                // DB에 회원 정보 삽입
                registerUser(email, password);
            }
        });

        btn_backspace.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(SignupActivity.this, LoginActivity.class));
                finish();
            }
        });
    }


    // 회원가입 정보 DB에 삽입하는 메소드
    private void registerUser(String email, String password){
        database = dbHelper.getWritableDatabase();

        // 중복 이메일 검사
        String checkEmailQuery = "select * from " + DBHelper.TABLE_USERS + " where " + DBHelper.COLUMN_EMAIL + " = ?";
        Cursor cursor = database.rawQuery(checkEmailQuery, new String[]{email});

        if (cursor.getCount() > 0){
            Toast.makeText(this, "이미 등록된 이메일입니다.", Toast.LENGTH_SHORT).show();
            cursor.close();
            return;
        }

        // 사용자 데이터 삽입
        ContentValues values = new ContentValues();
        values.put(DBHelper.COLUMN_EMAIL, email);
        values.put(DBHelper.COLUMN_PASSWORD, password);

        // 회원 데이터 삽입
        long result = database.insert(DBHelper.TABLE_USERS, null, values);

        // 결과 처리
        if (result == -1){
            Toast.makeText(this, "회원가입에 실패했습니다.", Toast.LENGTH_SHORT).show();
        } else{
            Toast.makeText(this, "회원가입이 완료되었습니다.", Toast.LENGTH_SHORT).show();
            startActivity(new Intent(SignupActivity.this, LoginActivity.class));
            finish();
        }
    }
}
```

## 📌 LoginActivity.java 파일
```java
package com.cookandroid.mobile_project;

import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.cookandroid.mobile_project.database.DBHelper;

public class LoginActivity extends AppCompatActivity {
    private DBHelper dbHelper;
    private SQLiteDatabase database;
    private EditText emailEditText, passwordEditText;
    private Button loginButton, signupButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        emailEditText = findViewById(R.id.emailEditText);
        passwordEditText = findViewById(R.id.passwordEditText);
        loginButton = findViewById(R.id.loginButton);
        signupButton = findViewById(R.id.signupButton);

        // DBHelper 초기화
        dbHelper = new DBHelper(this);

        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String email = emailEditText.getText().toString();
                String password = passwordEditText.getText().toString();
                if (email.isEmpty() || password.isEmpty()) {
                    Toast.makeText(LoginActivity.this, "아이디/비밀번호를 입력해주세요.", Toast.LENGTH_SHORT).show();
                } else {
                    // 로그인 성공: MainActivity로 이동
                    if(checkLogin(email, password)) {
                        startActivity(new Intent(LoginActivity.this, MainActivity.class));
                        finish();
                    } else {
                        // 로그인 실패: 오류 메시지 표시
                        Toast.makeText(LoginActivity.this, "아이디 또는 비밀번호가 잘못되었습니다.", Toast.LENGTH_SHORT).show();
                    }
                }
            }
        });

        signupButton.setOnClickListener(v -> {
            startActivity(new Intent(LoginActivity.this, SignupActivity.class));
            finish();
        });
    }

    private boolean checkLogin(String email, String password){
        database = dbHelper.getWritableDatabase();
        // select * from [table] where [email] = ? and [password] = ?;
        String query = "select * from " +
                DBHelper.TABLE_USERS + " where " +
                DBHelper.COLUMN_EMAIL + " = ? and " +
                DBHelper.COLUMN_PASSWORD + " = ?";
        Cursor cursor = database.rawQuery(query, new String[]{email, password});

        boolean isValid = cursor.getCount() > 0;
        cursor.close();
        database.close();
        return isValid;
    }
}
```
 


## 📌 계정 정보 확인
> 안드로이드 스튜디오에서 로그인과 회원가입 코드를 구현한 후 계정이 제대로 삽입되었는지는 아래 명령어로 확인한다.

```
sqlite3 [데이터베이스 이름]

.table                      # 테이블 목록 확인
select * from [테이블 이름]  # 테이블 내 정보 출력

.exit                       # sqlite3 종료
```

```toc

```