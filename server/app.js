import express from "express";
import fs from "fs";
import taskRouter from "./routes/taskRouter.js";
import userRouter from "./routes/userRouter.js";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

const tasks = JSON.parse(fs.readFileSync("./data/task.json"));
const users = JSON.parse(fs.readFileSync("./data/user.json"));

// Routes
app.use("/api/v1/task", taskRouter);
app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ status: "success", message: "Welcome to Task Manager API" });
});

export default app;
