import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/auth/signup", UserController.createUser);
router.post("/auth/login", UserController.loginUser);
router.post("/user/add-to-wishlist", auth(), UserController.addToWishlist);

export const UserRoutes = router;
