import { Router } from 'express';
import authController from '@/controllers/auth.controller';
import { authenticated } from '@/middlewares/authenticated';
import eventController from '@/controllers/event.controller';
import groupController from '@/controllers/group.controller';

const router = Router();

router.post('/login', authController.login);
router.get('/events', authenticated, eventController.all);
router.get('/events/:id', authenticated, eventController.show);
router.post('/events', authenticated, eventController.create);
router.put('/events/:id', authenticated, eventController.update);
router.delete('/events/:id', authenticated, eventController.delete);

router.get('/events/:eventId/groups', authenticated, groupController.all);
router.post('/events/:eventId/groups', authenticated, groupController.create);
router.get('/events/:eventId/groups/:id', authenticated, groupController.show);
router.put('/events/:eventId/groups/:id', authenticated, groupController.update);
router.delete('/events/:eventId/groups/:id', authenticated, groupController.delete);

export default router;
