import { Gender } from 'src/domain/enums/gender.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { PairEntity } from './pair.entity';

@Entity('animal')
export class AnimalEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', default: Gender.Unsexed })
  gender: Gender;

  @Column()
  dateOfBirth: Date;

  @Column({ type: 'varchar', nullable: true, default: null })
  image: string;

  @Column({ type: 'boolean' })
  ownedByUs: boolean;

  @ManyToOne(() => UserEntity, (user) => user.createdAnimals)
  createdBy: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => PairEntity, (pair) => pair.male)
  malePairs: PairEntity[];

  @OneToOne(() => PairEntity, (pair) => pair.female)
  femalePair: PairEntity;
}
