import express from "express";

const app = express();
app
  .route("/posts")
  .get((req, res) => {
    res.status(200).send("/posts GET 호출");
  })
  .post((req, res) => {
    res.status(201).send("/posts POST 호출");
  })
  .put((req, res) => {
    res.status(201).send("/posts PUT 호출");
  })
  .delete((req, res) => {
    res.status(204).send("/posts DELETE 호출");
  }); //delete인 경우 204로 하면 화면에 보이지는 않음
app.listen(3000, () => {
  console.log("서버 실행 중");
});
