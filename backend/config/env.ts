import { config } from "dotenv";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

config();

export default function env() {
    return createEnv({
        clientPrefix: "PUBLIC_",
        server: {
            IS_PRODUCTION: z.boolean()
        },
        client: {},
        runtimeEnv: process.env,
    });
}