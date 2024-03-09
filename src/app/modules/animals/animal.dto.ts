import { Gender } from 'src/domain/enums/gender.enum';

export class CreateAnimalDto {
  name: string;
  species: string;
  gender: Gender;
  userId: string;
}
