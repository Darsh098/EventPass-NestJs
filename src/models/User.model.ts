import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Event } from './event.model';
import { EventVisitor } from './eventVisitor.model';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  profilePhoto?: string;

  @Column({ unique: true })
  @Field()
  username: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  mobileNumber?: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field()
  updatedAt: string;

  @OneToMany(() => Event, (event) => event.organizer)
  @Field(() => [Event], { nullable: true })
  events?: Event[];

  @OneToMany(() => EventVisitor, (eventVisitor) => eventVisitor.visitor)
  @Field(() => [EventVisitor], { nullable: true })
  eventVisitors?: EventVisitor[];
}
