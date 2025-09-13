import groupService from '@/services/group.service';
import { Request, RequestHandler, Response } from 'express';
import { z } from 'zod';

class GroupController {
  all: RequestHandler = async (request: Request, response: Response): Promise<any> => {
    const { eventId } = request.params;
    const groups = await groupService.all(eventId);
    return response.json(groups);
  }

  show: RequestHandler = async (request: Request, response: Response): Promise<any> => {
    const { eventId, id } = request.params;
    const group = await groupService.show(id, eventId);
    return response.json(group);
  }

  create: RequestHandler = async (request: Request, response: Response): Promise<any> => {
    const { eventId } = request.params;
    const groupSchema = z.object({
      name: z.string()
    });

    const body = groupSchema.safeParse(request.body);

    if (!body.success) {
      return response.status(400).json({ error: z.treeifyError(body.error) })
    }

    const group = await groupService.create({ name: body.data.name, event_id: eventId });
    return response.status(201).json(group);
  }

  update: RequestHandler = async (request: Request, response: Response): Promise<any> => {
    const { id, eventId } = request.params;
    const groupSchema = z.object({
      name: z.string().optional()
    });

    const body = groupSchema.safeParse(request.body);

    if (!body.success) {
      return response.status(400).json({ error: z.treeifyError(body.error) });
    }

    const group = await groupService.update(id, { name: body.data.name });
    return response.json(group);
  }

  delete: RequestHandler = async (request: Request, response: Response): Promise<any> => {
    const { id } = request.params;
    const groupExists = await groupService.show(id);
    if (!groupExists) {
      return response.status(404).json({ error: 'Grupo inexistente' });
    }
    await groupService.delete(id);
    return response.status(204).json({});
  }
}

export default new GroupController();
