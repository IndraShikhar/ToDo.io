import jwt from "jsonwebtoken";

export const signjwtToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

export const createAndSendToken = (user, statusCode, message, res) => {
  const token = signjwtToken(user._id);
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: process.env.NODE_ENV !== "dev",
    httpOnly: true,
    sameSite: process.env.NODE_ENV !== "dev" ? "none" : "lax",
  });

  const shortUser = filterUserPublicData(user);

  return res.status(statusCode).json({
    status: "success",
    message,
    data: {
      user: shortUser,
    },
  });
};

export const filterUserPublicData = (user) => {
  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    profilePic: user.profilePic,
    tasks: user.tasks.length,
  };
};
