import fs from "fs";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";

import Task from "../models/taskModel.js";
import User from "../models/userModel.js";

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {}).then(() => {
  console.log("DB connection successful");
});

// Read JSON files
const tasks = JSON.parse(fs.readFileSync("./data/task.json", "utf-8"));
const users = JSON.parse(fs.readFileSync("./data/user.json", "utf-8"));

// Import DATA into DB
const importData = async () => {
  try {
    // await Task.create(tasks);
    await User.create(users);
    console.log("Data successfully loaded");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    // await Task.deleteMany();
    await User.deleteMany();
    console.log("Data successfully deleted");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

process.argv[2] === "-i" ? importData() : "";
process.argv[2] === "-d" ? deleteData() : "";
