import { Router } from 'express';
import authController from '../controllers/auth.controller';
import authenticate from '../middlewares/authenticate';

const router = Router();

router.get('/ping', authenticate, (request, response) => {
    return response.json({ pong: true, admin: true });
});
router.post('/login', authController.login);

export default router;
