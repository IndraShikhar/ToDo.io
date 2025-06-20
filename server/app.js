import express from "express";
import cors from "cors";

import userRouter from "./routes/userRouter.js";
import taskRouter from "./routes/taskRouter.js";

const app = express();

const allowedOrigins = [
  "https://to-do-io.vercel.app/",
  "https://your-frontend.com",
  "http://localhost:5173", // For local development
  "http://192.168.0.106:5173",
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error(`CORS Error: ${origin} not allowed`));
    }
  },
  credentials: true, // If you want to allow cookies or HTTP auth
};

app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (req, res, next) => {
  res.status(200).json({ status: "success", message: "The is the TODOio API" });
});

app.post("/", (req, res, next) => {
  const data = req.body;
  res.status(200).json({
    status: "success",
    data: {
      message: "You sent this data",
      data,
    },
  });
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);

export default app;
