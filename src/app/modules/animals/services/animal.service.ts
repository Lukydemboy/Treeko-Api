import { Injectable } from '@nestjs/common';
import { AnimalEntity } from 'src/database/entities/animal.entity';
import { Repository } from 'typeorm';
import { CreateAnimalDto } from '../dto/animal.dto';
import { UserEntity } from 'src/database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AnimalService {
  constructor(
    @InjectRepository(AnimalEntity)
    private readonly animalRepository: Repository<AnimalEntity>,
  ) {}

  async create(createAnimalDto: CreateAnimalDto, userId: string) {
    return this.animalRepository.save({
      ...createAnimalDto,
      createdBy: Object.assign(new UserEntity(), { id: userId }),
    });
  }
}
