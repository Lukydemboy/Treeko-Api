import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { AnimalEntity } from './animal.entity';

@Entity('pair')
export class PairEntity {
  @Unique(['father', 'mother'])
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ default: false })
  paired: boolean;

  @Column({ nullable: true, default: null })
  image?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => AnimalEntity, (animal) => animal.malePairs)
  @JoinColumn()
  male: AnimalEntity;

  @OneToOne(() => AnimalEntity, (animal) => animal.femalePair)
  @JoinColumn()
  female: AnimalEntity;
}
