import { RequestHandler, Router } from "express";

/**
 * WebRouter is a singleton class that simplifies route management for an Express application.
 * It allows developers to register routes dynamically while maintaining a centralized and organized structure.
 */
export default class WebRouter {

    /**
     * Singleton instance of the WebRouter.
     * Ensures only one instance of the class is created and used throughout the application.
     */
    public static instance?: WebRouter;

    /**
     * Internal Express Router instance.
     * This Router handles the registration of routes and middleware for the application.
     */
    public router: Router;

    /**
     * Private constructor to restrict direct instantiation.
     * Initializes the internal Router instance used for route registration.
     */
    private constructor() {
        this.router = Router();
    }

    /**
     * Retrieves or creates the singleton instance of WebRouter.
     * Ensures all route registrations use the same Router instance.
     * @returns The singleton instance of WebRouter.
     */
    public static getInstance(): WebRouter {
        if (!WebRouter.instance) {
            WebRouter.instance = new WebRouter();
        }
        return WebRouter.instance;
    }

    /**
     * Registers a GET route.
     * @param path The path for the route. It does not include any base path like `/api/`.
     * @param handlers A list of middleware or route handler functions to process requests for this route.
     * @returns The WebRouter class for method chaining.
     */
    public static get(path: string, ...handlers: RequestHandler[]): typeof WebRouter {
        const instance = this.getInstance();
        instance.router.get(path, ...handlers);
        return WebRouter;
    }

    /**
     * Registers a POST route.
     * @param path The path for the route. It does not include any base path like `/api/`.
     * @param handlers A list of middleware or route handler functions to process requests for this route.
     * @returns The WebRouter class for method chaining.
     */
    public static post(path: string, ...handlers: RequestHandler[]): typeof WebRouter {
        const instance = this.getInstance();
        instance.router.post(path, ...handlers);
        return WebRouter;
    }

    /**
     * Registers a PUT route.
     * @param path The path for the route. It does not include any base path like `/api/`.
     * @param handlers A list of middleware or route handler functions to process requests for this route.
     * @returns The WebRouter class for method chaining.
     */
    public static put(path: string, ...handlers: RequestHandler[]): typeof WebRouter {
        const instance = this.getInstance();
        instance.router.put(path, ...handlers);
        return WebRouter;
    }

    /**
     * Registers a DELETE route.
     * @param path The path for the route. It does not include any base path like `/api/`.
     * @param handlers A list of middleware or route handler functions to process requests for this route.
     * @returns The WebRouter class for method chaining.
     */
    public static delete(path: string, ...handlers: RequestHandler[]): typeof WebRouter {
        const instance = this.getInstance();
        instance.router.delete(path, ...handlers);
        return WebRouter;
    }

    /**
     * Provides access to the internal Router instance.
     * This method allows the routes registered in WebRouter to be added to an Express application.
     * @returns The internal Router instance containing all registered routes.
     */
    public static getRouter(): Router {
        return this.getInstance().router;
    }
}
