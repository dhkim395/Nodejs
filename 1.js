// server.js
const express = require("express");
const app = express();
const path = require("path");

// 정적 파일 제공
app.use(express.static(__dirname));

// login.html 제공
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

// GET 방식 로그인 처리
app.get("/login", (req, res) => {
  const { userid, userpw } = req.query;

  // HTML 직접 구성 (템플릿 없이)
  res.send(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8" />
      <title>로그인 결과</title>
    </head>
    <body>
      <h2>로그인 결과</h2>
      <p>아이디: <strong>${userid}</strong></p>
      <p>비밀번호: <strong>${userpw}</strong></p>
      <a href="/">돌아가기</a>
    </body>
    </html>
  `);
});

// 서버 시작
app.listen(3000, () => {
  console.log("서버 실행 중: http://localhost:3000");
});
