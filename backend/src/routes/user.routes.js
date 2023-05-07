import { Router } from "express";
import {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";

export const userRouter = Router();

userRouter.get("/users", getUsers);

userRouter.get("/users/:id", getUser);

userRouter.post("/users", createUser);

userRouter.put("/users/:id", updateUser);

userRouter.delete("/users/:id", deleteUser);
