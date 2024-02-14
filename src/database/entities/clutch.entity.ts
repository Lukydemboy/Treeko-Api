import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IncubatorEntity } from './incubator.entity';
import { EggEntity } from './egg.entity';
import { PairEntity } from './pair.entity';

@Entity('clutch')
export class ClutchEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ManyToOne(() => PairEntity, (pair) => pair.clutches, { eager: true })
  @JoinColumn()
  pair: PairEntity;

  @ManyToOne(() => IncubatorEntity, (incubator) => incubator.clutches)
  @JoinColumn()
  incubator: IncubatorEntity;

  @OneToMany(() => EggEntity, (egg) => egg.clutch, { eager: true })
  eggs: EggEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
