import { Request, Response, NextFunction, RequestHandler } from 'express';

export const interceptor: RequestHandler = (request: Request, response: Response, next: NextFunction) => {
  console.info(`[${request.method}] [${response.statusCode}] - ${request.url} ${request.method != "GET" ? request.body : []}`);
  next();
}
