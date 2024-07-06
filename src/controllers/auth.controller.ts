import authService from '../services/auth.service';
import { Request, RequestHandler, Response } from 'express';
import { z } from 'zod';

class AuthController {
    login: RequestHandler = async (request: Request, response: Response) => {
        const loginSchema = z.object({
            password: z.string()
        });

        const body = loginSchema.safeParse(request.body);
        if (!body.success) {
            return response.status(400).json({ error: 'Invalid data' });
        }

        const validPassword = await authService.validatePassword(body.data.password);
        if (!validPassword) {
            return response.status(400).json({ error: 'Invalid password' });
        }

        const token: string = await authService.createToken();
        return response.json({ token });
    }
}

export default new AuthController();
