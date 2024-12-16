import { config } from "dotenv";
import { z } from "zod";

config();

const environment = z.object({
    PORT: z.string().transform(Number),
    IS_DEVELOPMENT: z.string().transform((val) => val === "true" || val === "1")
});

const safe_env = environment.safeParse(process.env);

if (!safe_env.success) {
    console.error("Error en tus variables de entorno:", safe_env.error.format());
    throw new Error("Error al validar las variables de entorno.");
}

const env = (): z.infer<typeof environment> => safe_env.data;

export default env;