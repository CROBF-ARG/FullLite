import env from "./backend/config/env";
import express from "express";
import cors from "./backend/config/cors";
import logger from "./backend/middlewares/logger";

const app = express();
app.use(cors());
app.use(logger());
app.use(express.static("frontend"));

app.listen(env.PORT, () => {
    const localAddress = `http://localhost:${env.PORT}`;

    console.log(`Tu proyecto se está desplegando en:`);
    console.log(`- Local: ${localAddress}`);
});