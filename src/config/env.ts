import { config } from "dotenv";
import { z } from "zod";

config();

export const schema = z.object({
    PORT: z.coerce.number().min(1000).default(3000),
    MODE: z.union([
        z.literal("development"),
        z.literal("production"),
        z.literal("testing")
    ]).default("production")
});


export type Environment = z.infer<typeof schema>;

const { data: env, success, error } = schema.safeParse(process.env);

if (!success) {
    console.error("Error in your environment variables:", error.format());
    throw new Error("Environment variable validation failed.");
}

export default env as Environment;