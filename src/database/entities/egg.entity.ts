import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClutchEntity } from './clutch.entity';
import { AnimalEntity } from './animal.entity';

@Entity('egg')
export class EggEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  note: string;

  @OneToOne(() => AnimalEntity, (animal) => animal.hatchedFromEgg)
  hatchedAnimal: AnimalEntity;

  @ManyToOne(() => ClutchEntity, (clutch) => clutch.eggs)
  clutch: ClutchEntity;

  @Column()
  laidAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  hatchedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
