import express from "express";
import authController from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/auth/signup").post(authController.signup);

router.route("/auth/login").post(authController.login);

router.use(authMiddleware.protect);

router.route("/auth/me").get(authController.me);

router.route("/auth/update").patch(authController.update);

router.route("/auth/logout").get(authController.logout);

export default router;
