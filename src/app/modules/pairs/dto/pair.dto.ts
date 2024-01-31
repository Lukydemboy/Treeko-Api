import { AnimalEntity } from 'src/database/entities/animal.entity';

export class Pair {
  id: number;
  name: string;
  father: AnimalEntity;
  mother: AnimalEntity;
  paired: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export class CreatePairDto {
  name: string;
  father: AnimalEntity;
  mother: AnimalEntity;
  paired: boolean;
  image: string;
}

export class UpdatePairDto {
  name: string;
}
