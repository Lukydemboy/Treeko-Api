import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePairDto, UpdatePairDto } from '../dto/pair.dto';
import { PairEntity } from 'src/database/entities/pair.entity';

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
    return this.pairRepository.save({
      ...createPairDto,
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
