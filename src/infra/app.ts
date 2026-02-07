import "dotenv";
import http from "http";
import express from "express";

import systemOperatorsRoutes from "./routes/system-operator";
import authRoutes from "./routes/auth";

const app = express();

app.use(express.json({ limit: "12mb" }));
app.use(systemOperatorsRoutes);
app.use(authRoutes);

const server = http.createServer(app);

export { server };
