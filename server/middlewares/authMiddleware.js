import { promisify } from "util";

import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authMiddleware = {
  async protect(req, res, next) {
    try {
      const { authorization, cookie: cookieString } = req.headers;

      // Example: 'jwt=abc; jwt2=xyz'
      let cookies;

      if (cookieString)
        cookies = Object.fromEntries(
          cookieString?.split("; ").map((cookie) => cookie.split("="))
        );

      //   If there is no authorization header
      if (!cookies?.jwt) {
        if (!authorization)
          return res
            .status(401)
            .json({ status: "fail", message: "Unauthorized(No Header)" });
        // Check if the authorization header starts with "Bearer"
        if (!authorization.startsWith("Bearer"))
          return res
            .status(401)
            .json({ status: "fail", message: "Unauthorized(Not Bearer)" });
      }

      const token = cookies.jwt || authorization.split(" ")[1];
      //   If there is no token
      if (!token)
        return res
          .status(401)
          .json({ status: "fail", message: "Unauthorized(No Token)" });
      // Decode and search for user with the decoded id
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );
      const user = await User.findById(decoded.id);
      // Check if the user exists for the token
      if (!user)
        return res
          .status(401)
          .json({ status: "fail", message: "Unauthorized(User Not Found)" });

      //   Implement to check if the user changed his password after the token was issued

      req.user = user;
    } catch (err) {
      console.log(err);
      return res
        .status(401)
        .json({ status: "fail", message: "Unauthorized(Err)" });
    }

    next();
  },
};

export default authMiddleware;
