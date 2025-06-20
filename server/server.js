import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

const DB = process.env.DATABASE.replaceAll(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log("Database connection successful");
});

const port = process.env.PORT || 2000;
const HOST = "0.0.0.0";

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
