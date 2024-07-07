import { Event, PrismaClient } from "@prisma/client";

class EventService {
    private prisma = new PrismaClient();

    getEvents = async (): Promise<Event[]> => {
        const events: Event[] = await this.prisma.event.findMany();
        return events;
    }
}

export default new EventService();
