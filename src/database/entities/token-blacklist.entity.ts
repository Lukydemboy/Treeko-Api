import { Entity, PrimaryColumn } from 'typeorm';

@Entity('token-blacklist')
export class TokenBlacklistEntity {
  @PrimaryColumn()
  token: string;
}
