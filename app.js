// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import fileUpload from "express-fileupload";
// import cors from "cors";
// import  dbConnection  from "./database/dbConnection.js";
// import { errorMiddleware } from "./middlewares/error.js";
// import userRouter from "./routes/userRouter.js";
// import timelineRouter from "./routes/timelineRouter.js";
// import messageRouter from "./routes/messageRouter.js";
// import skillRouter from "./routes/skillRouter.js";
// import softwareApplicationRouter from "./routes/softwareApplicationRouter.js";
// import projectRouter from "./routes/projectRouter.js";

// const app = express();
// dotenv.config({ path: "./config/config.env" });

// app.use(
//   cors({
//     origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
//     // origin: ["http://localhost:5174", "http://localhost:5173"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })  
//     // cors({ origin: "http://localhost:5173", methods: ["GET", "POST", "PUT", "DELETE"], credentials: true })
// );



// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   })
// );

// // Backward-compatible user routes (both /api/v1/user/* and /api/v1/*)
// app.use("/api/v1/user", userRouter);
// app.use("/api/v1", userRouter);

// app.use("/api/v1/timeline", timelineRouter);
// app.use("/api/v1/message", messageRouter);
// app.use("/api/v1/skill", skillRouter);
// app.use("/api/v1/softwareapplication", softwareApplicationRouter);
// app.use("/api/v1/project", projectRouter);

// dbConnection();
// app.use(errorMiddleware);

// export default app;
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import dbConnection from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";
import timelineRouter from "./routes/timelineRouter.js";
import messageRouter from "./routes/messageRouter.js";
import skillRouter from "./routes/skillRouter.js";
import softwareApplicationRouter from "./routes/softwareApplicationRouter.js";
import projectRouter from "./routes/projectRouter.js";

dotenv.config({ path: "./config/config.env" });

const app = express();

const normalizeOrigin = (value) => {
  if (!value) return null;
  return value.match(/^https?:\/\//) ? value : `https://${value}`;
};

const allowedOrigins = [
  normalizeOrigin(process.env.PORTFOLIO_URL),
  normalizeOrigin(process.env.DASHBOARD_URL),
  "http://localhost:5174",
  "http://localhost:5173",
].filter(Boolean);

// ✅ Sirf ek CORS — sahi tarika
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS origin denied: ${origin}`));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/timeline", timelineRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/skill", skillRouter);
app.use("/api/v1/softwareapplication", softwareApplicationRouter);
app.use("/api/v1/project", projectRouter);

// ✅ DB connect karo
dbConnection();

app.use(errorMiddleware);

export default app;