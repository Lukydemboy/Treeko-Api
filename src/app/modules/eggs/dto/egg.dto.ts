import { ClutchEntity } from 'src/database/entities/clutch.entity';

export class UpdateEggDto {
  name?: string;
  note?: string;
  hatchedAt?: Date;
}

export class CreateEggDto {
  name: string;
  note?: string;
  laidAt: Date;
  clutch: ClutchEntity;
}
