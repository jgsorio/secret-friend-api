import { Router } from 'express';
import authController from '@/controllers/auth.controller';
import { authenticated } from '@/middlewares/authenticated';

const router = Router();

router.post('/login', authController.login);

export default router;
