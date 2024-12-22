import { config } from "dotenv";
import { z } from "zod";

config();

const environmentSchema = z.object({
    PORT: z.string().transform(Number),
    IS_DEVELOPMENT: z.string().transform((val) => val === "true" || val === "1")
});

const safeEnv = environmentSchema.safeParse(process.env);

if (!safeEnv.success) {
    console.error("Error in your environment variables:", safeEnv.error.format());
    throw new Error("Environment variable validation failed.");
}

const { data: env } = safeEnv;

export default env as z.infer<typeof environmentSchema>;
