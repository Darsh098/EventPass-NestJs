import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Scan {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  scanId: number;

  @Column()
  @Field((type) => Int)
  qrCode: number;

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field()
  updatedAt: string;
}
