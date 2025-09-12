import prisma from '@/database/prisma';
import { Event, Prisma } from '@/generated/prisma';

type EventStore = Prisma.Args<typeof prisma.event, 'create'>['data'];
type EventUpdate = Prisma.Args<typeof prisma.event, 'update'>['data'];

class EventService {
  all = async (): Promise<Event[]> => {
    return await prisma.event.findMany();
  }

  findById = async (id: string): Promise<Event|null> => {
    return await prisma.event.findFirst({ where: { id } });
  }

  store = async (data: EventStore): Promise<Event> => {
    return await prisma.event.create({ data });
  }

  update = async (id: string, data: EventUpdate): Promise<Event> => {
    return await prisma.event.update({ where: { id }, data });
  }

  delete = async (id: string): Promise<Event> => {
    return await prisma.event.delete({ where: { id }});
  }
}

export default new EventService();
