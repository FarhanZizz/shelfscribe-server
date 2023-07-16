import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/auth/signup", UserController.createUser);
router.post("/auth/login", UserController.loginUser);

export const UserRoutes = router;
