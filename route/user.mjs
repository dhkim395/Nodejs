import express from "express";

const router = express.Router(); //라우터의 기능을 많이 쓸 수 있게 해줌

router.use((req, res, next) => {
  console.log("users에 존재하는 미들웨어");
  next();
});

// http://127.0.0.1:3000/users/
router.get("/", (req, res) => {
  res.status(200).send("GET: /users 회원정보보기");
});

router.post("/", (req, res) => {
  res.status(201).send("POST: /users 회원가입");
});
router.put("/:id", (req, res) => {
  res.status(201).send("PUT: /users/:id 정보 수정");
});
router.delete("/:id", (req, res) => {
  res.status(201).send("DELETE: /users/:id 회원탈퇴");
});

export default router;
