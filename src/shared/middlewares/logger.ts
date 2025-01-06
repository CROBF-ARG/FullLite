import type { Request, Response, NextFunction } from 'express';

/**
 * Logger middleware function.
 * 
 * A middleware function for logging HTTP requests in an Express application.
 *
 * This middleware logs details about each HTTP request, including the method, URL, 
 * status code, and the duration of the request in milliseconds. The log entry 
 * includes a timestamp for when the response was sent.
 *
 * @param req - The Express Request object representing the HTTP request.
 * @param res - The Express Response object representing the HTTP response.
 * @param next - The NextFunction callback to pass control to the next middleware.
 *
 * @example
 * // Import the logger middleware
 * import loggerMiddleware from './logger';
 * 
 * // Use it in an Express application
 * app.use(loggerMiddleware());
 */
function logger(req: Request, res: Response, next: NextFunction) {
    // Destructure the HTTP method and URL from the request
    const { method, url } = req;

    // Record the start time of the request
    const start = Date.now();

    // Add a listener to the 'finish' event of the response
    res.on('finish', () => {
        // Calculate the duration of the request
        const duration = Date.now() - start;

        // Create a timestamp for the log
        const now = new Date();
        const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;

        // Get the response status code
        const statusCode = res.statusCode;

        // Log the information in a structured format
        console.log(
            `[${date}] ${statusCode} ${method} ${url} - ${duration}ms`
        );
    });

    // Pass control to the next middleware
    next();
}

// Export the logger as a factory function for flexibility
export default () => logger;
