import { RequestHandler, Router } from "express";

/**
 * ApiRouter is a singleton class that simplifies the registration of API routes in an Express application.
 * It provides static methods to register routes with common HTTP methods (GET, POST, PUT, DELETE)
 * and ensures all routes are prefixed with `/api/`.
 */
export default class ApiRouter {

    /**
     * The single instance of the ApiRouter.
     */
    public static instance?: ApiRouter;

    /**
     * The internal Express Router instance used to handle route registration.
     */
    public router: Router;

    /**
     * Private constructor to enforce the singleton pattern.
     * Initializes the internal Express Router.
     */
    constructor() {
        this.router = Router();
    }

    /**
     * Retrieves the single instance of the ApiRouter, creating it if it does not yet exist.
     * @returns The singleton instance of ApiRouter.
     */
    public static getInstance(): ApiRouter {
        if (!ApiRouter.instance) ApiRouter.instance = new ApiRouter;
        return ApiRouter.instance;
    }

    /**
     * Registers a GET route prefixed with `/api/`.
     * @param path The path for the route, relative to `/api/`.
     * @param handlers The request handlers to process the route.
     * @returns The ApiRouter class for method chaining.
     */
    public static get(path: string, ...handlers: RequestHandler[]): typeof ApiRouter {
        const instance = this.getInstance();
        instance.router.get(`/api/${path}`, ...handlers);
        return ApiRouter;
    }

    /**
     * Registers a POST route prefixed with `/api/`.
     * @param path The path for the route, relative to `/api/`.
     * @param handlers The request handlers to process the route.
     * @returns The ApiRouter class for method chaining.
     */
    public static post(path: string, ...handlers: RequestHandler[]): typeof ApiRouter {
        const instance = this.getInstance();
        instance.router.post(`/api/${path}`, ...handlers);
        return ApiRouter;
    }

    /**
     * Registers a PUT route prefixed with `/api/`.
     * @param path The path for the route, relative to `/api/`.
     * @param handlers The request handlers to process the route.
     * @returns The ApiRouter class for method chaining.
     */
    public static put(path: string, ...handlers: RequestHandler[]): typeof ApiRouter {
        const instance = this.getInstance();
        instance.router.put(`/api/${path}`, ...handlers);
        return ApiRouter;
    }

    /**
     * Registers a DELETE route prefixed with `/api/`.
     * @param path The path for the route, relative to `/api/`.
     * @param handlers The request handlers to process the route.
     * @returns The ApiRouter class for method chaining.
     */
    public static delete(path: string, ...handlers: RequestHandler[]): typeof ApiRouter {
        const instance = this.getInstance();
        instance.router.delete(`/api/${path}`, ...handlers);
        return ApiRouter;
    }

    /**
     * Retrieves the internal Express Router instance.
     * This is used to add the registered routes to the main Express application.
     * @returns The Express Router instance.
     */
    public static getRouter(): Router {
        return this.getInstance().router;
    }
}
