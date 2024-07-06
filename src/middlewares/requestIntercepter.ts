import { NextFunction, Request, RequestHandler, Response } from 'express';

const requestIntercepter: RequestHandler = (request: Request, response: Response, next: NextFunction) => {
    console.log(`${request.method.toUpperCase()} - ${response.statusCode} ${request.path}`);

    next();
}

export default requestIntercepter;
