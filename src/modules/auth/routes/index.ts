import type { Response, Request } from "express";
import { login } from "../controllers/login";
import ApiRouter from "../../../shared/services/ApiRouter";

ApiRouter.post("login", (req: Request, res: Response) => {
    res.json({
        success: login(req.body.name, req.body.password)
    });
});