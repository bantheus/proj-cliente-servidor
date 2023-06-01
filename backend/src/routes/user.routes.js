import { Router } from "express";
import {
  signupUser,
  getUsers,
  // getUser,
  // deleteUser,
  updateUser,
} from "../controllers/userController.js";

export const userRouter = Router();

// Signup
userRouter.post("/", signupUser);

// Others routes
userRouter.get("/", getUsers);
// userRouter.get("/:id", getUser);
userRouter.put("/:id", updateUser);
// userRouter.delete("/:id", deleteUser);
