import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClutchEntity } from './clutch.entity';

@Entity('incubator')
export class IncubatorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float' })
  temperature: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @OneToMany(() => ClutchEntity, (clutch) => clutch.incubator)
  clutches: IncubatorEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
