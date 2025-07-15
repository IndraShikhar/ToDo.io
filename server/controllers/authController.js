import User from "../models/userModel.js";
import { createAndSendToken, filterUserPublicData } from "../utils/helpers.js";

const authController = {
  async login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide username and password",
      });
    }

    const user = await User.findOne({ username }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect username or password",
      });
    }

    createAndSendToken(user, 200, "Logged in successfully", res);

    // const shortUser = filterUserPublicData(user);

    // req.status(200).json({
    //   status: "success",
    //   message: "Logged in successfully",
    //   data: {
    //     user: shortUser,
    //   },
    // });
  },

  async signup(req, res) {
    const { username, password, email, profilePic } = req.body;

    const newUser = await User.create({
      username,
      password,
      email,
      profilePic,
    });

    createAndSendToken(newUser, 201, "Signed up successfully", res);

    // const shortUser = filterUserPublicData(newUser);

    // res.status(200).json({
    //   status: "success",
    //   message: "Signed up successfully",
    //   data: {
    //     user: shortUser,
    //   },
    // });
  },

  me(req, res) {
    // This will always run after the protect route so will have the current User in req.user

    const shortUser = filterUserPublicData(req.user);

    res.status(200).json({
      status: "success",
      message: "You are logged in",
      data: {
        user: shortUser,
      },
    });
  },

  update(req, res) {
    const { username, email, profilePic, password, newPassword } = req.body;

    if (req.user.username !== username)
      return res.status(400).json({
        status: "fail",
        message: "Username cannot be changed",
      });

    req.user.email = email;
    req.user.profilePic = profilePic;

    if (newPassword && req.user.comparePassword(password)) {
      req.user.password = newPassword;
    } else {
      return res.status(400).json({
        status: "fail",
        message: "Incorrect password",
      });
    }

    req.user.save({
      validateBeforeSave: true,
    });

    const shortUser = filterUserPublicData(req.user);

    res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
      data: {
        user: shortUser,
      },
    });
  },

  logout(req, res) {
    res.cookie("jwt", "loggedout", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    res.status(200).json({ status: "success", message: "Logged out" });
  },
};

export default authController;
