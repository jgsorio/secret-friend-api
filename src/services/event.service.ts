import prisma from '@/database/prisma';
import { Event, Prisma } from '@/generated/prisma';
import peopleService from './people.service';
import twillioAdapter from '@/adapters/twillio.adapter';

type EventStore = Prisma.Args<typeof prisma.event, 'create'>['data'];
type EventUpdate = Prisma.Args<typeof prisma.event, 'update'>['data'];

class EventService {
  all = async (): Promise<Event[]> => {
    return await prisma.event.findMany();
  }

  findById = async (id: string): Promise<Event> => {
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

  doMatch = async (id: string): Promise<boolean> => {
    const event = await prisma.event.findFirst({ where: { id } });
    if (!event) return false;

    const peoples = await peopleService.all(event.id);
    if (!peoples || peoples.length < 2) return false;
  
    let available = peoples.map(p => p.id);

    let matches: { id: string; match: string }[] = [];

    for (let i = 0; i < peoples.length; i++) {
      const current = peoples[i].id;

      let options = available.filter(p => p !== current);

      if (i === peoples.length - 1 && options.length === 0) {
        return this.doMatch(id);
      }

      const chosen = options[Math.floor(Math.random() * options.length)];

      matches.push({ id: current, match: chosen });

      available = available.filter(p => p !== chosen);
    }

    matches.forEach(async (match) => {
      await prisma.eventPeople.update({ where: { id: match.id }, data: { matched: match.match }});
      const people = await prisma.eventPeople.findFirst({ where: { id: match.id }});
      const peopleFriend = await prisma.eventPeople.findFirst({ where: { id: people.matched }});
      await twillioAdapter.sendSms(people.phone, `Olá ${people.name}, tudo bem? Seu amigo secreto é ${peopleFriend.name}!`);
    });

    return true;
  }

}

export default new EventService();
