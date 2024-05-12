import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Events } from 'src/models/Events.model';
import { User } from 'src/models/User.model';
import { EventVisitor } from 'src/models/EventVisitor.model';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Events)
    private readonly eventRepository: Repository<Events>,
    @InjectRepository(EventVisitor)
    private readonly eventVisitorRepository: Repository<EventVisitor>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAllEvents() {
    return await this.eventRepository.find({ relations: ['organizer'] });
  }

  async findEventById(id: number) {
    return await this.eventRepository.findOne({ where: { id } });
  }

  async findEventsByOrganizerClerkId(clerkId: string) {
    return await this.eventRepository.find({
      where: { organizer: { clerkId } },
      relations: ['organizer', 'eventVisitors', 'eventVisitors.visitor'],
    });
  }

  async createEvent(
    name: string,
    description: string,
    venue: string,
    eventDate: string,
    startTime: string,
    endTime: string,
    timeDuration: number,
    entriesCount: number,
    organizer: User,
    photo: string,
  ) {
    const newEvent = this.eventRepository.create({
      name,
      description,
      venue,
      eventDate,
      startTime,
      endTime,
      timeDuration,
      entriesCount,
      organizer,
      photo,
    });
    return await this.eventRepository.save(newEvent);
  }

  async updateEvent(
    id: number,
    name: string,
    description: string,
    venue: string,
    eventDate: string,
    startTime: string,
    endTime: string,
    timeDuration: number,
    entriesCount: number,
  ) {
    const eventToUpdate = await this.eventRepository.findOne({ where: { id } });
    if (!eventToUpdate) {
      throw new Error('Event not found');
    }
    eventToUpdate.name = name ?? eventToUpdate.name;
    eventToUpdate.description = description ?? eventToUpdate.description;
    eventToUpdate.venue = venue ?? eventToUpdate.venue;
    eventToUpdate.eventDate = eventDate ?? eventToUpdate.eventDate;
    eventToUpdate.startTime = startTime ?? eventToUpdate.startTime;
    eventToUpdate.endTime = endTime ?? eventToUpdate.endTime;
    eventToUpdate.timeDuration = timeDuration ?? eventToUpdate.timeDuration;
    eventToUpdate.entriesCount = entriesCount ?? eventToUpdate.entriesCount;
    return await this.eventRepository.save(eventToUpdate);
  }

  async updateEventExpiredStatus(id: number, isExpired: boolean) {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) {
      throw new Error('Event not found');
    }

    event.isExpired = isExpired;
    return this.eventRepository.save(event);
  }

  async updateEntriesCount(id: number, entriesCount: number) {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) {
      throw new Error('Event not found');
    }

    event.entriesCount = entriesCount;
    return this.eventRepository.save(event);
  }

  async deleteEvent(id: number) {
    const eventToDelete = await this.eventRepository.findOne({ where: { id } });
    if (!eventToDelete) {
      throw new Error('Event not found');
    }
    await this.eventVisitorRepository.delete({ events: eventToDelete });
    await this.eventRepository.remove(eventToDelete);
    return true;
  }

  async findAllEventVisitors() {
    return await this.eventVisitorRepository.find();
  }

  async findEventVisitorById(id: number) {
    return await this.eventVisitorRepository.findOne({
      where: { id },
      relations: ['visitor', 'events', 'events.organizer'],
    });
  }

  async findEventVisitorByUserClerkId(clerkId: string) {
    return await this.eventVisitorRepository.find({
      where: {
        visitor: {
          clerkId: clerkId,
        },
      },
      relations: ['visitor', 'events', 'events.organizer'],
    });
  }

  async createEventVisitor(event: Events, visitor: User) {
    const newEventVisitor = this.eventVisitorRepository.create({
      events: event,
      visitor,
    });
    return await this.eventVisitorRepository.save(newEventVisitor);
  }

  async updateEventVisitor(id: number, scanned: number) {
    const eventVisitorToUpdate = await this.eventVisitorRepository.findOne({
      where: { id },
      relations: ['events', 'events.organizer', 'visitor'],
    });
    if (!eventVisitorToUpdate) {
      throw new Error('Event visitor not found');
    }
    eventVisitorToUpdate.scanned = scanned;
    return await this.eventVisitorRepository.save(eventVisitorToUpdate);
  }

  async deleteEventVisitor(eventId: number, email: string) {
    const eventVisitorToDelete = await this.eventVisitorRepository.findOne({
      where: { events: { id: eventId }, visitor: { email: email } },
    });

    await this.eventVisitorRepository.remove(eventVisitorToDelete);
    return true;
  }
}
