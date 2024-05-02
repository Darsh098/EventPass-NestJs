import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Events } from 'src/models/Events.model';
import { EventVisitor } from 'src/models/EventVisitor.model';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/models/User.model';
import { EventResolver } from './EventResolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, Events, EventVisitor])],
  providers: [EventsService, EventResolver, UsersService],
})
export class EventsModule {}
