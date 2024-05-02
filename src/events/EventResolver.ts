import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { Events } from 'src/models/Events.model'; // Updated import path to match Events model
import { EventsService } from './events.service';
import { UsersService } from 'src/users/users.service';
import { EventVisitor } from 'src/models/EventVisitor.model';

@Resolver((of) => Events)
export class EventResolver {
  constructor(
    private readonly eventService: EventsService,
    private readonly usersService: UsersService,
  ) {}

  // Queries For Events Model
  @Query((returns) => [Events], { name: 'getAllEvents' })
  async getAllEvents() {
    return await this.eventService.findAllEvents();
  }

  @Query((returns) => Events, { name: 'getEventById' })
  async getEventById(@Args('id', { type: () => Int }) id: number) {
    return await this.eventService.findEventById(id);
  }

  // Mutations For Events Model
  @Mutation((returns) => Events, { name: 'createEvent' })
  async createEvent(
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('venue') venue: string,
    @Args('eventDate') eventDate: string,
    @Args('startTime') startTime: string,
    @Args('endTime') endTime: string,
    @Args('timeDuration', { type: () => Int }) timeDuration: number,
    @Args('organizerId', { type: () => Int }) organizerId: number,
    @Args('photo', { nullable: true }) photo: string,
  ) {
    const organizer = await this.usersService.findUserById(organizerId);
    if (!organizer) {
      throw new Error(`Organizer with ID ${organizerId} not found`);
    }
    return await this.eventService.createEvent(
      name,
      description,
      venue,
      eventDate,
      startTime,
      endTime,
      timeDuration,
      organizer,
      photo,
    );
  }

  @Mutation((returns) => Events, { name: 'updateEvent' })
  async updateEvent(
    @Args('id', { type: () => Int }) id: number,
    @Args('name', { nullable: true }) name: string,
    @Args('description', { nullable: true }) description: string,
    @Args('venue', { nullable: true }) venue: string,
    @Args('eventDate', { nullable: true }) eventDate: string,
    @Args('startTime', { nullable: true }) startTime: string,
    @Args('endTime', { nullable: true }) endTime: string,
    @Args('timeDuration', { type: () => Int, nullable: true })
    timeDuration: number,
    @Args('photo', { nullable: true }) photo: string,
  ) {
    return await this.eventService.updateEvent(
      id,
      name,
      description,
      venue,
      eventDate,
      startTime,
      endTime,
      timeDuration,
      photo,
    );
  }

  @Mutation((returns) => Boolean, { name: 'deleteEvent' })
  async deleteEvent(@Args('id', { type: () => Int }) id: number) {
    return await this.eventService.deleteEvent(id);
  }

  // Queries For EventVisitor Model
  @Query((returns) => [EventVisitor], { name: 'getAllEventVisitors' })
  async getAllEventVisitors() {
    return await this.eventService.findAllEventVisitors();
  }

  @Query((returns) => EventVisitor, { name: 'getEventVisitorById' })
  async getEventVisitorById(@Args('id', { type: () => Int }) id: number) {
    return await this.eventService.findEventVisitorById(id);
  }

  // Mutations For EventVisitor Model
  @Mutation((returns) => EventVisitor, { name: 'createEventVisitor' })
  async createEventVisitor(
    @Args('QR_code') QR_code: string,
    @Args('eventId', { type: () => Int }) eventId: number,
    @Args('visitorId', { type: () => Int }) visitorId: number,
    @Args('entriesCount', { type: () => Int }) entriesCount: number,
  ) {
    // Retrieve event and visitor objects from their IDs
    const event = await this.eventService.findEventById(eventId);
    const visitor = await this.usersService.findUserById(visitorId);
    if (!event || !visitor) {
      throw new Error('Event or visitor not found');
    }
    return await this.eventService.createEventVisitor(
      QR_code,
      event,
      visitor,
      entriesCount,
    );
  }

  @Mutation((returns) => EventVisitor, { name: 'updateEventVisitor' })
  async updateEventVisitor(
    @Args('id', { type: () => Int }) id: number,
    @Args('QR_code', { nullable: true }) QR_code: string,
    @Args('entriesCount', { type: () => Int, nullable: true })
    entriesCount: number,
  ) {
    return await this.eventService.updateEventVisitor(
      id,
      QR_code,
      entriesCount,
    );
  }

  @Mutation((returns) => Boolean, { name: 'deleteEventVisitor' })
  async deleteEventVisitor(@Args('id', { type: () => Int }) id: number) {
    return await this.eventService.deleteEventVisitor(id);
  }
}
