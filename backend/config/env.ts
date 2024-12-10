import { config } from "dotenv";
import { z } from "zod";

config();

const environment = z.object({
    PORT: z.string()
});

export default function env() {
    const safe_env = environment.safeParse(process.env);

    if (!safe_env.success) throw Error("Error en tu entorno(env)");

    return safe_env.data;
}