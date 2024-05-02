import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { EventVisitor } from './EventVisitor.model';
import { Events } from './Events.model';

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

  @Column()
  @Field()
  clerkId: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  profilePhoto?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  mobileNumber?: string;

  @CreateDateColumn()
  @Field()
  createdAt: string;

  @UpdateDateColumn()
  @Field()
  updatedAt: string;

  @OneToMany(() => Events, (eventObj) => eventObj.organizer)
  @Field(() => [Events], { nullable: true })
  events?: Events[];

  @OneToMany(() => EventVisitor, (eventVisitor) => eventVisitor.visitor)
  @Field(() => [EventVisitor], { nullable: true })
  eventVisitors?: EventVisitor[];
}
