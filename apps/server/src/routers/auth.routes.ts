import express, { Router, Request, Response } from "express";
import { register, login, getUser } from "../controllers/auth";
import User from "../models/User";
import authMiddleware from "../middlewares/auth";

const router: Router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.post("/me", authMiddleware, getUser);

export default router;
