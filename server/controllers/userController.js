import User from "../models/userModel.js";

const userController = {
  async getAllUsers(req, res) {
    try {
      const users = await User.find();

      res.status(200).json({
        status: "success",
        data: {
          results: users.length,
          users,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err,
      });
    }
  },

  createUser(req, res) {
    res.status(500).json({
      status: "error",
      message: "This route is not defined! Please use /signup instead",
    });
  },

  async getUserById(req, res, next) {
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).json({
      status: "success",
      data: { user },
    });
  },

  async getCurrentUser(req, res, next) {
    if (!res.locals.user) {
      return res.status(401).json({
        status: "fail",
        message:
          "You are not logged in! Please log in to get access. (Get current user)",
      });
    }

    return res
      .status(200)
      .json({ status: "success", data: { user: res.locals.user } });
  },
};

export default userController;
