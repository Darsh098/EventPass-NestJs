import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Events } from './Events.model';
import { User } from './User.model';

@Entity()
@ObjectType()
export class EventVisitor {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column({ default: 0 })
  @Field((type) => Int)
  scanned: number;

  @ManyToOne(() => Events, (eventObj) => eventObj.eventVisitors)
  @Field((type) => Events)
  events: Events;

  @ManyToOne(() => User, (user) => user.eventVisitors)
  @Field((type) => User)
  visitor: User;

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field()
  updatedAt: string;
}
