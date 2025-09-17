import  prisma from '@/database/prisma';
import { EventPeople, Prisma } from '@/generated/prisma';

type PeopleCreate = Prisma.Args<typeof prisma.eventPeople, 'create'>['data'];
type PeopleUpdate = Prisma.Args<typeof prisma.eventPeople, 'update'>['data'];

class PeopleService {
  all = async (eventId: string, groupId?: string): Promise<EventPeople[]> => {
    return await prisma.eventPeople.findMany({
      where: {
        OR: [
          {
            event_group_id: groupId
          },
          {
            event_id: eventId
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

  clearMatches = async (eventId: string): Promise<boolean> => {
    try {
      await prisma.eventPeople.updateMany({ where: { event_id: eventId}, data: { matched: '' }});
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new PeopleService();
