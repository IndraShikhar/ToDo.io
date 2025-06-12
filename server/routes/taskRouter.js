import express from "express";
import taskController from "../controllers/taskController.js";
import authController from "../controllers/authController.js";

const router = express.Router();

router.route("/").get(taskController.getAllTasks);
router.route("/:id").get(taskController.getTaskById);

router.use(authController.protect);
router.route("/:id").patch(taskController.updateTask);
router.route("/").post(taskController.createNewTask);

export default router;
