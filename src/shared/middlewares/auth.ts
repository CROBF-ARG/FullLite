import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Secret key for JWT verification (replace with your actual secret or load from env)
const SECRET_KEY = process.env.JWT_SECRET || "";

/**
 * Helper function to extract cookies manually if `cookie-parser` is not available.
 * @param req The HTTP request object.
 * @returns An object containing cookies as key-value pairs.
 */
const extractCookies = (req: Request): Record<string, string> => {
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) return {};
    return Object.fromEntries(
        cookieHeader.split(";").map((cookie) => {
            const [key, value] = cookie.split("=").map((part) => part.trim());
            return [key, decodeURIComponent(value)];
        })
    );
};

/**
 * Middleware to check if a user is authenticated.
 * - Checks for a cookie named `_auth` or an Authorization header.
 * - If found, verifies the JWT and attaches the payload to `req.auth`.
 * - If not found or verification fails, returns an authentication error.
 */
export const isAuthenticated = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Try to use cookies from `cookie-parser` or manually parse them
        const cookies = req.cookies || extractCookies(req);
        const token = cookies._auth || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: "Authentication required." });
        }

        try {
            const payload = jwt.verify(token, SECRET_KEY);
            res.locals.auth = payload; // Attach payload to req.auth
            next();
        } catch (err) {
            return res.status(401).json({ error: "Invalid or expired token." });
        }
    };
};

/**
 * Middleware to ensure a user is unauthenticated.
 * - Checks if a cookie named `_auth` or an Authorization header exists.
 * - If either is found, returns an error.
 * - Otherwise, proceeds to the next middleware.
 */
export const isUnauthenticated = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Try to use cookies from `cookie-parser` or manually parse them
        const cookies = req.cookies || extractCookies(req);
        const hasAuthCookie = Boolean(cookies._auth);
        const hasAuthHeader = Boolean(req.headers.authorization);

        if (hasAuthCookie || hasAuthHeader) {
            return res.status(403).json({ error: "Already authenticated." });
        }

        next();
    };
};
