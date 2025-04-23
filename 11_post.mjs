import express from "express";
const app = express();
app.use(express.urlencoded({ extended: true })); //post 요청용
app.post("/test", (req, res) => {
  const { userid, userpw } = req.body;
  console.log(`id:`, userid);
  console.log("pw:", userpw);
  res.send(`아이디:${userid},비밀번호:${userpw}`);
});

app.listen(3000, () => {
  console.log("서버 실행 중");
});
