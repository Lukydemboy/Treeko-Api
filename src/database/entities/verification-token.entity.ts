import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  Unique,
} from 'typeorm';

@Entity('verification-token')
export class VerificationTokenEntity {
  @PrimaryColumn()
  @Unique(['token, userId'])
  token: string;

  @PrimaryColumn()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
