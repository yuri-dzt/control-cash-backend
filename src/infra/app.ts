import "dotenv";
import http from "http";
import express from "express";

import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";

const app = express();

app.use(express.json({ limit: "12mb" }));
app.use(userRoutes);
app.use(authRoutes);

const server = http.createServer(app);

export { server };
