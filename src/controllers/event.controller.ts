import { Request, RequestHandler, Response } from 'express';
import eventService from '../services/event.service';

class EventController {
    getEvents: RequestHandler = async (request: Request, response: Response) => {
        const events = await eventService.getEvents();
        return response.json({ events });
    }
}

export default new EventController();
