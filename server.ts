import env from "./backend/config/env";
import express from "express";
import cors from "./backend/config/cors";
import logger from "./backend/middlewares/logger";

const { PORT } = env();

const app = express();
app.use(cors());
app.use(logger());

app.listen(PORT, () => {
    const localAddress = `http://localhost:${PORT}`;

    console.log(`Tu proyecto se está desplegando en:`);
    console.log(`- Local: ${localAddress}`);
});