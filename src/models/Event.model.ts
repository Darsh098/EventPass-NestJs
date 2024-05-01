import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.model';
import { EventVisitor } from './eventVisitor.model';

@Entity()
@ObjectType()
export class Event {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  venue?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  eventDate?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  startTime?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  endTime?: string;

  @Column({ nullable: true })
  @Field((type) => Int, { nullable: true })
  timeDuration?: number;

  @ManyToOne(() => User, (user) => user.events)
  @Field((type) => User)
  organizer: User;

  @Column({ nullable: true })
  @Field({ nullable: true })
  photo?: string;

  @Column({ default: true })
  @Field()
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field()
  updatedAt: string;

  @OneToMany(() => EventVisitor, (eventVisitor) => eventVisitor.event)
  @Field(() => [EventVisitor], { nullable: true })
  eventVisitors?: EventVisitor[];
}
