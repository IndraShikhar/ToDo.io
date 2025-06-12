import Task from "../models/taskModel.js";

const taskController = {
  async getAllTasks(req, res, next) {
    try {
      const tasks = await Task.find();

      res.status(200).json({
        status: "success",
        data: {
          results: tasks.length,
          tasks,
        },
      });
    } catch (err) {
      req.status(400).json({
        status: "fail",
        message: err,
      });
    }
  },

  async getTaskById(req, res, next) {
    try {
      const { id } = req.params;

      const task = await Task.findById(id);
      res.status(200).json({
        status: "success",
        data: { task },
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err,
      });
    }
  },

  async createNewTask(req, res, next) {
    try {
      const { title, description } = req.body;

      const newTask = await Task.create({ title, description });

      res.locals.user.tasks.push(newTask._id);
      await res.locals.user.save();

      res.status(200).json({
        status: "success",
        data: { task: newTask },
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err,
      });
    }
  },

  async updateTask(req, res, next) {
    try {
      const { id } = req.params;
      const { title, description, done } = req.body;
      const task = await Task.findByIdAndUpdate(
        id,
        { title, description, done },
        { new: true, runValidators: true }
      );

      res.status(200).json({
        status: "success",
        data: { task },
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err,
      });
    }
  },
};

export default taskController;
