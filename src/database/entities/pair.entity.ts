import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { AnimalEntity } from './animal.entity';

@Entity('pair')
export class PairEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => AnimalEntity, (animal) => animal.id)
  @JoinColumn()
  male: AnimalEntity;

  @ManyToOne(() => AnimalEntity, (animal) => animal.id)
  @JoinColumn()
  female: AnimalEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  owner: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
