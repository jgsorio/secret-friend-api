import authService from '@/services/auth.service';
import { NextFunction, Request, RequestHandler, Response } from 'express';

export const authenticated: RequestHandler = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
  if (!request.headers.authorization) {
    return response.status(401).json({ error: 'Acesso Negado' });
  }

  const accessToken = request.headers.authorization;
  if (accessToken !== authService.createToken()) {
    return response.status(401).json({ error: 'Acesso Negado' });
  }

  next();
}
