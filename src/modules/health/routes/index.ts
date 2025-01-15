import type { Request, Response } from "express";
import ApiRouter from "../../../shared/utils/ApiRouter";

ApiRouter.get("health", (_: Request, res: Response) => {
    const healthStatus = {
        status: "success",
        message: "Server is healthy",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    };

    res.status(200).json(healthStatus);
});