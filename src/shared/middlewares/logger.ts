import type { Request, Response, NextFunction } from 'express';

function logger(req: Request, res: Response, next: NextFunction) {
    const { method, url } = req;
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        const now = new Date();
        const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;
        const statusCode = res.statusCode;
        console.log(
            `[${date}] ${statusCode} ${method} ${url} - ${duration}ms`
        );
    });

    next();
};

export default () => logger;