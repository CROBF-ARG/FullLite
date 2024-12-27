import _cors from "cors";
import type { CorsOptions } from "cors";

const options: CorsOptions = {
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

const cors = _cors(options);

export default cors;