import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/auth/signup", UserController.createUser);
router.post("/auth/login", UserController.loginUser);
router.post("/user/add-to-wishlist", auth(), UserController.addToWishlist);
router.get("/user/wishlist", auth(), UserController.getWishList);
router.post("/user/add-to-reading", auth(), UserController.addToReading);
router.get("/user/reading", auth(), UserController.getReading);

export const UserRoutes = router;
