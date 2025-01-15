import jwt from "jsonwebtoken";
import { Response as ExpressResponse } from "express";

interface Response extends ExpressResponse {
    cookies: { [key: string]: string }
}

// Secret key for JWT (replace with your actual secret or load from env)
const SECRET_KEY = process.env.JWT_SECRET || "";

/**
 * Utility function to authenticate a user.
 * - Generates a JWT from the provided payload.
 * - Sets the token as a cookie (if `cookie-parser` is available) and returns the token.
 * 
 * @param res The Express response object.
 * @param payload The data to be included in the JWT token.
 * @param cookieName The name of the cookie to store the token in.
 * @returns The generated JWT token.
 */
export const authenticate = (res: Response, payload: Record<string, any>, cookieName: string = "_auth"): string => {
    // Generate the JWT token
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    // Set the token as a cookie if cookie-parser is available
    if (res.cookies) {
        res.cookie(cookieName, token, {
            httpOnly: true,
            maxAge: 3600000, // 1hr
        });
    }

    // Return the token in the response (optional, for custom message or further handling)
    return token;
};
