const fs = require("fs");
/*
// 동기식 별도로 예외처리를 해줘야 함
const data = fs.readFileSync("example.txt", "utf8");   
console.log("파일 내용:", data);
*/
// 비동기식
fs.readFile("example.txt", "utf8", (err, data) => {
  if (err) {
    console.log("파일 읽기 실패:", err);
    return;
  }
  console.log("파일내용:", data);
});
console.log("프로그램을 종료합니다.");
