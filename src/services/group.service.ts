import prisma from '@/database/prisma';
import { EventGroup, Prisma } from '@/generated/prisma';

type GroupCreate = Prisma.Args<typeof prisma.eventGroup, 'create'>['data'];
type GroupUpdate = Prisma.Args<typeof prisma.eventGroup, 'update'>['data'];

class GroupService {
  all = async (eventId: string): Promise<EventGroup[]> => {
    return await prisma.eventGroup.findMany({ where: { event_id: eventId }});
  }

  show = async (id: string, eventId?: string): Promise<EventGroup> => {
    return await prisma.eventGroup.findFirst({
      where: {
        id: id,
        OR: [
          {
            event_id: eventId
          }
        ]
      }
    });
  }

  create = async (data: GroupCreate): Promise<EventGroup> => {
    return await prisma.eventGroup.create({ data });
  }

  update = async (id: string, data: GroupUpdate): Promise<EventGroup> => {
    return await prisma.eventGroup.update({ where: { id }, data });
  }

  delete = async (id: string): Promise<EventGroup> => {
    return await prisma.eventGroup.delete({ where: { id }});
  }
}

export default new GroupService();

