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
import { EventVisitor } from './EventVisitor.model';
import { User } from './User.model';

@Entity()
@ObjectType()
export class Events {
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

  @Column()
  @Field((type) => Int)
  entriesCount: number;

  @ManyToOne(() => User, (user) => user.events)
  @Field((type) => User)
  organizer: User;

  @Column({ nullable: true })
  @Field({ nullable: true })
  photo?: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field()
  updatedAt: string;

  @OneToMany(() => EventVisitor, (eventVisitor) => eventVisitor.events)
  @Field(() => [EventVisitor], { nullable: true })
  eventVisitors?: EventVisitor[];

  @Column({ default: false })
  @Field()
  isExpired: boolean;
}
