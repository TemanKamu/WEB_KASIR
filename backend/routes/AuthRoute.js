import { Login, LoginSession, Logout } from "../controllers/AuthController.js";
import express from "express";

const router = express.Router();

router.post("/login", Login);
router.get("/login-session", LoginSession);
router.delete("/logout", Logout);

export default router;
