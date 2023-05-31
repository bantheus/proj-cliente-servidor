import { Router } from "express";
import { loginUser, logoutUser } from "../controllers/userController.js";

export const authRouter = Router();

// Login
authRouter.post("/login", loginUser);

// Logout
authRouter.post("/logout", logoutUser);
