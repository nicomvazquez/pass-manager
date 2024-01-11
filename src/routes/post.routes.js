import { Router } from "express";
import { authRequest } from "../middlewares/validateToken.js";
import {
  deletePost,
  getPost,
  getPosts,
  postPost,
  updatePost,
} from "../controllers/post.controller.js";

const router = Router();

router.get("/post", authRequest, getPosts);

router.get("/post/:id", authRequest, getPost);

router.post("/post", authRequest, postPost);

router.delete("/post/:id", authRequest, deletePost);

router.put("/post/:id", authRequest, updatePost);

export default router;
