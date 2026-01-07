import express from "express";
import http from "http";
import "dotenv";

import userRoutes from "./routes/user";

const app = express();

app.use(express.json({ limit: "12mb" }));
app.use(userRoutes);

const server = http.createServer(app);

export { server };
