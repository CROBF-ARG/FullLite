import express from "express";
import cors from "./config/cors";
import env from "./config/env";

const app = express();

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("../public"));

app.listen(env.PORT, () => {
    console.log(`Your project is running in http://localhost:${env.PORT}`);
})

