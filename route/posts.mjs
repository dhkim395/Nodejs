import express from "express";

const router = express.Router();

router.use((req, res, next) => {
  console.log("posts에 존재하는 미들웨어");
  next();
});

router.get("/", (req, res) => {
  res.status(200).send("GET: /posts 게시글 목록 보기");
});
router.post("/", (req, res) => {
  res.status(201).send("GET: /posts게시글 입력");
});
// put delete 는 id를 받아야함
router.put("/:id", (req, res) => {
  res.status(201).send("GET: /posts /:id 게시글 수정하기");
});
router.delete("/:id", (req, res) => {
  res.status(204).send("GET: /posts /:id 게시글 삭제하기");
});
export default router;
