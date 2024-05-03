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
      relations: ['organizer'],
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
    photo: string,
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
    eventToUpdate.photo = photo ?? eventToUpdate.photo;
    return await this.eventRepository.save(eventToUpdate);
  }

  async deleteEvent(id: number) {
    const eventToDelete = await this.eventRepository.findOne({ where: { id } });
    if (!eventToDelete) {
      throw new Error('Event not found');
    }
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

  async createEventVisitor(QR_code: string, event: Events, visitor: User) {
    const newEventVisitor = this.eventVisitorRepository.create({
      QR_code,
      events: event,
      visitor,
    });
    return await this.eventVisitorRepository.save(newEventVisitor);
  }

  async updateEventVisitor(id: number, QR_code: string) {
    const eventVisitorToUpdate = await this.eventVisitorRepository.findOne({
      where: { id },
    });
    if (!eventVisitorToUpdate) {
      throw new Error('Event visitor not found');
    }
    eventVisitorToUpdate.QR_code = QR_code ?? eventVisitorToUpdate.QR_code;
    return await this.eventVisitorRepository.save(eventVisitorToUpdate);
  }

  async deleteEventVisitor(id: number) {
    const eventVisitorToDelete = await this.eventVisitorRepository.findOne({
      where: { id },
    });
    if (!eventVisitorToDelete) {
      throw new Error('Event visitor not found');
    }
    await this.eventVisitorRepository.remove(eventVisitorToDelete);
    return true;
  }
}
