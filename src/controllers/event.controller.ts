import { Request, RequestHandler, Response } from 'express';
import { z } from 'zod';
import eventService from '@/services/event.service';

class EventController {
  all: RequestHandler = async (request: Request, response: Response): Promise<any> => {
    const events = await eventService.all();
    return response.json(events);
  }

  show: RequestHandler = async (request: Request, response: Response): Promise<any> => {
    const { id } = request.params;
    const event = await eventService.findById(id);
    if (!event) {
      return response.status(404).json({});
    }
    return response.json(event);
  }

  create: RequestHandler = async (request: Request, response: Response): Promise<any> => {
    const eventSchema = z.object({
      name: z.string(),
      description: z.string()
    });

    const body = eventSchema.safeParse(request.body);

    if (!body.success) {
      return response.status(400).json({ error: 'Dados Inválidos' });
    }

    const event = await eventService.store(body.data);
    return response.status(201).json(event);
  }

  update: RequestHandler = async (request: Request, response: Response): Promise<any> => {
    const { id } = request.params;
    const eventSchema = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      grouped: z.boolean().optional(),
      status: z.boolean().optional()
    });

    const body = eventSchema.safeParse(request.body);

    if (!body.success) {
      return response.status(400).json({ error: 'Dados Inválidos' });
    }

    const event = await eventService.update(id, body.data);
    return response.json(event);
  }

  delete: RequestHandler = async (request: Request, response: Response): Promise<any> => {
    const { id } = request.params;
    await eventService.delete(id);
    return response.status(204).json({});
  }
}

export default new EventController();
