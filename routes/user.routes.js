import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getAllUsers, getUserById, signup, login } from "../controllers/user.controllers.js";

export const userRouter = Router();

userRouter.get("/", verifyToken, getAllUsers);
userRouter.get("/:id", verifyToken, getUserById);
userRouter.post("/signup", signup);
userRouter.post("/login", login)