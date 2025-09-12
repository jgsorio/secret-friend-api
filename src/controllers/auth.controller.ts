import authService from '@/services/auth.service';
import { Request, RequestHandler, Response } from 'express';
import { z } from 'zod';

class AuthController {
  login: RequestHandler = async (request: Request, response: Response): Promise<any> => {
    const lognSchema = z.object({
      password: z.string()
    });

    const body = lognSchema.safeParse(request.body);

    if (!body.success) {
      return response.json({ error: 'Dados inválidos' });
    }

    if (authService.validatePassword(body.data.password)) {
      return response.json({
        token: authService.createToken()
      })
    }

    return response.status(403).json({ error: 'Acesso Negado' });
  }
}

export default new AuthController();
