import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Events } from 'src/models/Events.model';
import { User } from 'src/models/User.model';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Events)
    private readonly eventRepository: Repository<Events>,
  ) {}

  async findAllEvents(): Promise<Events[]> {
    return await this.eventRepository.find();
  }

  async findEventById(id: number): Promise<Events> {
    return await this.eventRepository.findOne({ where: { id } });
  }

  async createEvent(
    name: string,
    description: string,
    venue: string,
    eventDate: string,
    startTime: string,
    endTime: string,
    timeDuration: number,
    organizer: User,
    photo: string,
  ): Promise<Events> {
    const newEvent = this.eventRepository.create({
      name,
      description,
      venue,
      eventDate,
      startTime,
      endTime,
      timeDuration,
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
    photo: string,
  ): Promise<Events> {
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
    eventToUpdate.photo = photo ?? eventToUpdate.photo;
    return await this.eventRepository.save(eventToUpdate);
  }

  async deleteEvent(id: number): Promise<boolean> {
    const eventToDelete = await this.eventRepository.findOne({ where: { id } });
    if (!eventToDelete) {
      throw new Error('Event not found');
    }
    await this.eventRepository.remove(eventToDelete);
    return true;
  }
}
