import express from "express";
import userController from "../controllers/userController.js";
import authController from "../controllers/authController.js";

const router = express.Router();

router.route("/").get(userController.getAllUsers);
// router.route("/:id").get(userController.getUserById);
router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);

router.use(authController.protect);
router.route("/me").get(userController.getCurrentUser);
// router.route("/logout").post(authController.logout);

export default router;
