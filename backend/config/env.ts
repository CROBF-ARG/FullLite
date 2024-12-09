import { config } from "dotenv";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

config();

export default function env() {
    return createEnv({
        server: {
            DATABASE_URL: z.string().url(),
            OPEN_AI_API_KEY: z.string().min(1),
        },
        clientPrefix: "PUBLIC_",
        client: {
            PUBLIC_URL_BASE: z.string()
        },
        runtimeEnv: process.env,
    });
}