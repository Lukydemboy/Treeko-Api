import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnimalEntity } from './animal.entity';
import { PairEntity } from './pair.entity';

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  password: string;

  @Column({ default: false })
  verified: boolean;

  @Column({ default: getRandomInt(0, 42) })
  avatar: number;

  @Column({ nullable: true, unique: true })
  username: string;

  @OneToMany(() => AnimalEntity, (animal) => animal.owner)
  animals: AnimalEntity[];

  @OneToMany(() => PairEntity, (pair) => pair.owner)
  pairs: PairEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
