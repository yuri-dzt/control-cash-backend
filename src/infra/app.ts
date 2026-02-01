import "dotenv";
import http from "http";
import express from "express";

import systemOperatorsRoutes from "./routes/system-operator";

const app = express();

app.use(express.json({ limit: "12mb" }));
app.use(systemOperatorsRoutes);

const server = http.createServer(app);

export { server };
