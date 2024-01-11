import { Router } from "express";
import {
  register,
  login,
  logout,
  profile,
  verifyToken,
} from "../controllers/auth.controller.js";
import { authRequest } from "../middlewares/validateToken.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/profile", authRequest, profile);

router.get("/validate", verifyToken);

export default router;
