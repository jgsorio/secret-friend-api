import  prisma from '@/database/prisma';
import { EventPeople, Prisma } from '@/generated/prisma';

type PeopleCreate = Prisma.Args<typeof prisma.eventPeople, 'create'>['data'];
type PeopleUpdate = Prisma.Args<typeof prisma.eventPeople, 'update'>['data'];

class PeopleService {
  all = async (eventId: string, groupId?: string): Promise<EventPeople[]> => {
    return await prisma.eventPeople.findMany({
      where: {
        event_id: eventId,
        OR: [
          {
            event_group_id: groupId
          }
        ]
      }
    });
  }

  create = async (data: PeopleCreate): Promise<EventPeople> => {
    return await prisma.eventPeople.create({ data });
  }

  show = async (eventId: string, groupId?: string): Promise<EventPeople> => {
    return await prisma.eventPeople.findFirst({ where: { event_id: eventId, OR: [{ event_group_id: groupId}] } });
  }

  update = async (id: string, data: PeopleUpdate): Promise<EventPeople> => {
    return await prisma.eventPeople.update({ where: { id }, data });
  }

  delete = async (id: string): Promise<EventPeople> => {
    return await prisma.eventPeople.delete({ where: { id }});
  }
}

export default new PeopleService();
