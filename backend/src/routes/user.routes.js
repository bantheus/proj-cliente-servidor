import { Router } from "express";
import {
  loginUser,
  signupUser,
  getUsers,
  logoutUser,
  // getUser,
  // deleteUser,
  // updateUser,
} from "../controllers/userController.js";

export const userRouter = Router();

// Login
userRouter.post("/login", loginUser);

// Signup
userRouter.post("/", signupUser);

// Logout
userRouter.post("/logout", logoutUser);

// Others routes
userRouter.get("/", getUsers);
// userRouter.get("/:id", getUser);
// userRouter.put("/:id", updateUser);
// userRouter.delete("/:id", deleteUser);
