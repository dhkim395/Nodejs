const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public")); //실제 폴더 이름
app.use("/static", express.static("public")); // /staticURL접근,public실제 폴더

app.set("view engine", "ejs");
//views= C:\home\Nodejs\views
app.set("views", path.join(__dirname, "views"));

//http://127.0.0.1:3000/
app.get("/", (req, res) => {
  res.send("<h2> 홈페이지 입니다. 다양한 기능을 테스트 해보세요.</h2>");
});
//http://127.0.0.1:3000/user/10
app.get("/user/:id", (req, res) => {
  res.send(`요청한 사용자 ID는 ${req.params.id}입니다.`);
});

app.get("search", (req, res) => {
  const { keyword } = req.query;
  res.send(`검색어:${keyword}`);
});

app.post("/submit", (req, res) => {
  const { name, age } = req.body;
  res.send(`이름:${name},나이:${age}`);
});

app.get("/hello", (req, res) => {
  res.render("hello", { name: "김사과" });
});

app.get("/posts", (req, res) => {
  const host = [
    { title: "첫 번째 글", content: "내용입니다" },
    { title: "두 번째 글", content: "EXpress는 정말 편하네요!~" },
  ];
  res.render("posts", { posts });
});
app.listen(port, () => {
  console.log("서버 실행 중");
});
