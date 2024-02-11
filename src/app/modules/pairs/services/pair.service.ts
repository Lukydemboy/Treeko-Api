import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePairDto, UpdatePairDto } from '../dto/pair.dto';
import { PairEntity } from 'src/database/entities/pair.entity';
import { AnimalEntity } from 'src/database/entities/animal.entity';

@Injectable()
export class PairService {
  constructor(
    @InjectRepository(PairEntity)
    private readonly pairRepository: Repository<PairEntity>,
  ) {}

  async getAll() {
    return this.pairRepository.find({
      relations: {
        female: true,
        male: true,
      },
    });
  }

  async getById(id: string) {
    return this.pairRepository.findOne({
      where: { id },
      relations: {
        female: true,
        male: true,
      },
    });
  }

  async create(createPairDto: CreatePairDto, userId: string) {
    console.log('createPairDto', createPairDto.female);

    const pair = await this.pairRepository.findOne({
      where: {
        female: Object.assign(new AnimalEntity(), {
          id: createPairDto.female.id,
        }),
      },
    });

    if (pair) throw new ConflictException('Female already in another pair');

    let name = createPairDto.name;
    if (!name)
      name = `${createPairDto?.male?.name} x ${createPairDto?.female?.name}`;

    return this.pairRepository.save({
      ...createPairDto,
      name,
      createdBy: Object.assign(new UserEntity(), { id: userId }),
    });
  }

  async update(updateAnimalDto: UpdatePairDto, pairId: string) {
    return this.pairRepository.update(pairId, updateAnimalDto);
  }

  async delete(pairId: string) {
    return this.pairRepository.softDelete(pairId);
  }
}
