import type { Application } from "express";

/**
 * Logs all registered routes of an Express application.
 * @param app - The Express application instance.
 */
export function listRoutes(app: Application): void {
    /**
     * Recursively traverses and prints routes in the app's router stack.
     * @param path - Current route path being traversed.
     * @param layer - Layer of the stack being processed.
     */
    function print(path: string[], layer: any): void {
        if (layer.route) {
            // If the layer is a route, iterate over its stack
            layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))));
        } else if (layer.name === "router" && layer.handle.stack) {
            // If the layer is a router, traverse its stack
            layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))));
        } else if (layer.method) {
            // Log the HTTP method and path
            console.log(
                "%s /%s",
                layer.method.toUpperCase(),
                path.concat(split(layer.regexp)).filter(Boolean).join("/")
            );
        }
    }

    /**
     * Splits and parses a given route path or regexp.
     * @param thing - Path or regexp to process.
     * @returns Array of path segments or a placeholder for complex routes.
     */
    function split(thing: any): string[] {
        if (typeof thing === "string") {
            return thing.split("/");
        } else if (thing.fast_slash) {
            return [""];
        } else {
            const match = thing
                .toString()
                .replace("\\/?", "")
                .replace("(?=\\/|$)", "$")
                .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
            return match ? match[1].replace(/\\(.)/g, "$1").split("/") : [`<complex:${thing.toString()}>`];
        }
    }

    // Start traversing the app's router stack
    app._router.stack.forEach(print.bind(null, []));
}
