import express from "express";
import taskController from "../controllers/taskController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware.protect);

router
  .route("/")
  .get(taskController.getUserTasks)
  .post(taskController.createTask);

router
  .route("/:id")
  //   .get(taskController.getTask)
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

export default router;
