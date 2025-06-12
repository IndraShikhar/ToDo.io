import { log } from "console";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";

function generateJWTToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

function createSendToken(user, statusCode, res) {
  const token = generateJWTToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);

  const shrunkUser = {
    _id: user._id,
    username: user.username,
    displayname: user.displayname,
    email: user.email,
    photo: user.photo,
  };

  res.status(statusCode).json({
    status: "success",
    message: "Login successful",
    data: {
      user: shrunkUser,
      token,
    },
  });
}

const authController = {
  async signup(req, res, next) {
    const { username, displayname, email, password, passwordConfirm } =
      req.body;

    if (password !== passwordConfirm) {
      return res.status(400).json({
        status: "fail",
        message: "Passwords do not match",
      });
    }

    try {
      const newUser = await User.create({
        username,
        displayname,
        email,
        password,
        passwordConfirm,
      });

      createSendToken(newUser, 201, res);
      //
    } catch (err) {
      console.log(err);
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  },

  async login(req, res, next) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide username and password",
      });
    }

    try {
      const user = await User.findOne({ username }).select("+password");

      if (!user || !(await user.correctPassword(user.password, password))) {
        return res.status(401).json({
          status: "fail",
          message: "Incorrect username or password",
        });
      }

      createSendToken(user, 200, res);
      //
    } catch (err) {
      console.log(err);
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  },

  async protect(req, res, next) {
    let token;
    // Get token from header or from cookie
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1].trim();
    } else if (req.cookies?.jwt) {
      token = req.cookies.jwt;
    }

    // Check if the token exists
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in! Please log in to get access.",
      });
    }

    try {
      // Decode the token using secret
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );
      // Fetch the user from database
      const user = await User.findById(decoded.id);
      // Check if the id is correct and user exists
      if (!user) {
        return res.status(401).json({
          status: "fail",
          message: "The user belonging to this token does not exist",
        });
      }

      // If the user exists, check if they changed password after the token was issued
      // TODO
      // // Do this when implement the reset password feature

      // The user is already logged in
      // Putting user in res for future use
      res.locals.user = user;
      return next();
    } catch (err) {
      return res.status(401).json({
        status: "fail",
        message:
          "You are not logged in! Please log in to get access. (Protect Error)",
      });
    }
  },

  // logout(req, res, next) {
  //   res.cookie("jwt", "loggedout", {
  //     expires: new Date(Date.now() + 10 * 1000),
  //     httpOnly: true,
  //   });
  //   res.status(200).json({
  //     status: "success",
  //     message: "Logout successful",
  //   });
  // },
};

export default authController;
