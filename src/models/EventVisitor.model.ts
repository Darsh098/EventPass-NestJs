import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Event } from './event.model';
import { User } from './user.model';

@Entity()
@ObjectType()
export class EventVisitor {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  QR_code: string;

  @ManyToOne(() => Event, (event) => event.eventVisitors)
  @Field((type) => Event)
  event: Event;

  @ManyToOne(() => User, (user) => user.eventVisitors)
  @Field((type) => User)
  visitor: User;

  @Column()
  @Field((type) => Int)
  entriesCount: number;

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field()
  updatedAt: string;
}
