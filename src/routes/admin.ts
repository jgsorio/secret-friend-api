import { Router } from 'express';
import authController from '../controllers/auth.controller';
import authenticate from '../middlewares/authenticate';
import eventController from '../controllers/event.controller';

const router = Router();

router.get('/ping', authenticate, (request, response) => {
    return response.json({ pong: true, admin: true });
});
router.post('/login', authController.login);

router.get('/events', authenticate, eventController.getEvents);

export default router;
