import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnimalEntity } from 'src/database/entities/animal.entity';
import { CreateAnimalDto } from '../animal.dto';
import { UserEntity } from 'src/database/entities/user.entity';

export class AnimalsService {
  constructor(
    @InjectRepository(AnimalEntity)
    private readonly animalRepository: Repository<AnimalEntity>,
  ) {}

  async createAnimal(data: CreateAnimalDto): Promise<AnimalEntity> {
    const userEntity = new UserEntity();
    userEntity.id = data.userId;
    return this.animalRepository.save({ ...data, owner: userEntity });
  }
}
