import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { Events } from 'src/models/Events.model'; // Updated import path to match Events model
import { EventsService } from './events.service';
import { UsersService } from 'src/users/users.service';

@Resolver((of) => Events)
export class EventResolver {
  constructor(
    private readonly eventService: EventsService,
    private readonly usersService: UsersService,
  ) {}

  @Query((returns) => [Events], { name: 'getAllEvents' })
  async getAllEvents(): Promise<Events[]> {
    return await this.eventService.findAllEvents();
  }

  @Query((returns) => Events, { name: 'getEventById' })
  async getEventById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Events> {
    return await this.eventService.findEventById(id);
  }

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
  ): Promise<Events> {
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
  ): Promise<Events> {
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
  async deleteEvent(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    return await this.eventService.deleteEvent(id);
  }
}
