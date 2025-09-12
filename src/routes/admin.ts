import { Router } from 'express';
import authController from '@/controllers/auth.controller';
import { authenticated } from '@/middlewares/authenticated';
import eventController from '@/controllers/event.controller';

const router = Router();

router.post('/login', authController.login);
router.get('/events', authenticated, eventController.all);
router.get('/events/:id', authenticated, eventController.show);
router.post('/events', authenticated, eventController.create);
router.put('/events/:id', authenticated, eventController.update);
router.delete('/events/:id', authenticated, eventController.delete);

export default router;
