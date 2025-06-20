import Task from "../models/taskModel.js";

const taskController = {
  async createTask(req, res, next) {
    // title,description,completed
    const { title, description } = req.body;

    const data = {
      title,
      description,
    };

    const newTask = await Task.create(data);

    req.user.tasks.push(newTask._id);
    await req.user.save();

    res.status(200).json({
      status: "success",
      data: {
        message: "Task created successfully",
        task: newTask,
      },
    });
  },

  async getUserTasks(req, res, next) {
    const tasks = await Promise.all(
      req.user.tasks.map((id) => Task.findById(id))
    );
    res.status(200).json({
      status: "success",
      data: {
        message: "Tasks fetched successfully",
        tasks,
      },
    });
  },

  async updateTask(req, res, next) {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const task = await Task.findById(id);

    task.title = title;
    task.description = description;
    task.completed = completed;

    await task.save();

    res.status(200).json({
      status: "success",
      data: {
        message: "Task updated successfully",
        task,
      },
    });
  },

  async deleteTask(req, res, next) {
    const { id } = req.params;

    await Task.findByIdAndDelete(id);

    req.user.tasks.pull(id);
    await req.user.save();

    res.status(200).json({
      status: "success",
      data: {
        message: "Task deleted successfully",
      },
    });
  },
};

export default taskController;
