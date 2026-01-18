import "dotenv";
import http from "http";
import express from "express";

import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";
import sessionRoutes from "./routes/session";

const app = express();

app.use(express.json({ limit: "12mb" }));
app.use(userRoutes);
app.use(authRoutes);
app.use(sessionRoutes);

const server = http.createServer(app);

export { server };
