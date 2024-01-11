import express, { json } from "express";
import morgan from "morgan";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", postRoutes);

app.use(express.static(join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "../client/dist/index.html"));
});

export default app;
