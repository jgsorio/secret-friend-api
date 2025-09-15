import { Request, RequestHandler, Response } from 'express';
import peopleService from '@/services/people.service';
import { z } from 'zod';

class PeopleController {
  all: RequestHandler = async (request: Request, response: Response): Promise<any> => {
    const { eventId, groupId } = request.params;
    const peoples = await peopleService.all(eventId, groupId);
    return response.json(peoples);
  }

  create: RequestHandler = async (request: Request, response: Response): Promise<any> => {
    const { eventId, groupId } = request.params;
    const peopleSchema = z.object({
      name: z.string(),
      phone: z.string()
    });

    const body = peopleSchema.safeParse(request.body);

    if (!body.success) {
      return response.status(400).json({ error: z.treeifyError(body.error) });
    }

    const people = await peopleService.create({ event_id: eventId, event_group_id: groupId, ...body.data });
    return response.status(201).json(people);
  }

  show: RequestHandler = async (request: Request, response: Response): Promise<any> => {
    const { eventId, groupId } = request.params;
    const people = await peopleService.show(eventId, groupId);
    return response.json(people);
  }

  update: RequestHandler = async (request: Request, response: Response): Promise<any> => {
    const { id } = request.params;
    const peopleSchema = z.object({
      name: z.string(),
      phone: z.string()
    });

    const body = peopleSchema.safeParse(request.body);

    if (!body.success) {
      return response.status(400).json({ error: z.treeifyError(body.error) });
    }

    const people = await peopleService.update(id, body.data);
    return response.json(people);
  }

  delete: RequestHandler = async (request: Request, response: Response): Promise<any> => {
    const { id } = request.params;
    await peopleService.delete(id);
    return response.status(204).json({});
  }
}

export default new PeopleController();
