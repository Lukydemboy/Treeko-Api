import { UserEntity } from 'src/database/entities/user.entity';
import { Gender } from 'src/domain/enums/gender.enum';

export class Animal {
  id: number;
  name: string;
  gender: Gender;
  dateOfBirth: Date;
  image: string;
  ownedByUs: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class CreateAnimalDto {
  name: string;
  gender: Gender;
  dateOfBirth: Date;
  image: string;
  ownedByUs: boolean;
  createdBy: UserEntity;
  createdAt: Date;
  updatedAt: Date;
}
