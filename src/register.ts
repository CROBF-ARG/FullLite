import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import env from "./config/env";

const MODULES_PATH = join(__dirname, "modules");
const COMMON_ROUTE_PATH = ["routes", "index"];

/**
 * Constructs the full path to the main route file of a module.
 * 
 * @param module_name - The name of the module directory.
 * @returns The full path to the route file, including the extension (.ts or .js).
 */
function getMainRouteFile(module_name: string): string {
    const path = join(MODULES_PATH, module_name, ...COMMON_ROUTE_PATH);
    const extension = env.MODE === "development" ? ".js" : ".js";
    return `${path}${extension}`;
}

/**
 * Registers all modules in the `modules` directory by dynamically importing their main route files.
 * Modules are expected to have a `routes/index.ts` or `routes/index.js` file.
 */
export default async function register(): Promise<void> {
    console.log("\n===============================");
    console.log("🌟 Starting module registration...");
    console.log("===============================\n");

    const module_dirs = readdirSync(MODULES_PATH).filter((file) => {
        const full_path = join(MODULES_PATH, file);
        return statSync(full_path).isDirectory();
    });

    if (module_dirs.length === 0) {
        console.log("⚠️ No modules found in the directory.\n");
        console.log("===============================");
        return;
    }

    for (const module_name of module_dirs) {
        try {
            const routePath = getMainRouteFile(module_name);
            console.log(`🔄 Attempting to load module: ${module_name}...`);
            await import(routePath);
            console.log(`✅ Module "${module_name}" loaded successfully!`);
        } catch (error) {
            console.log(`❌ Critical error while loading module "${module_name}".`);
            console.error(error);
        }
    }

    console.log("\n===============================");
    console.log("🎉 Module registration complete!");
    console.log("===============================\n");
}
