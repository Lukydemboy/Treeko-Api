import { AnimalEntity } from 'src/database/entities/animal.entity';

export class Pair {
  id: number;
  name: string;
  male: AnimalEntity;
  female: AnimalEntity;
  paired: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export class CreatePairDto {
  name: string;
  male: AnimalEntity;
  female: AnimalEntity;
  paired: boolean;
  image: string;
}

export class UpdatePairDto {
  name: string;
}
