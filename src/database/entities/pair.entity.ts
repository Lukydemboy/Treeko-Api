import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { AnimalEntity } from './animal.entity';
import { ClutchEntity } from './clutch.entity';

@Entity('pair')
export class PairEntity {
  @Unique(['father', 'mother'])
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ default: null, nullable: true })
  pairedAt: Date;

  @Column({ nullable: true, default: null })
  image?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => AnimalEntity, (animal) => animal.malePairs, { eager: true })
  @JoinColumn()
  male: AnimalEntity;

  @OneToOne(() => AnimalEntity, (animal) => animal.femalePair, { eager: true })
  @JoinColumn()
  female: AnimalEntity;

  @OneToMany(() => ClutchEntity, (clutch) => clutch.pair)
  clutches: ClutchEntity[];
}
