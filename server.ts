import env from "./backend/config/env";
import express from "express";
import cors from "cors";
import morgan from "morgan";

const { PORT } = env();

const app = express();
app.use(cors());
app.use(morgan("dev"));

app.listen(PORT, () => {
    const localAddress = `http://localhost:${PORT}`;

    console.log(`Tu proyecto se está desplegando en:`);
    console.log(`- Local: ${localAddress}`);
});