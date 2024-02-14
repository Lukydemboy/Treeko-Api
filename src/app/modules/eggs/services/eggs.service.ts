import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EggEntity } from 'src/database/entities/egg.entity';
import { CreateEggDto, UpdateEggDto } from '../dto/egg.dto';

@Injectable()
export class EggsService {
  constructor(
    @InjectRepository(EggEntity)
    private readonly eggRepository: Repository<EggEntity>,
  ) {}

  async getAll() {
    return this.eggRepository.find();
  }

  async getById(id: string) {
    return this.eggRepository.findOne({
      where: { id },
      relations: {
        clutch: true,
      },
    });
  }

  async create(createPairDto: CreateEggDto) {
    return this.eggRepository.save(createPairDto);
  }

  async update(updateAnimalDto: UpdateEggDto, eggId: string) {
    return this.eggRepository.update(eggId, updateAnimalDto);
  }

  async delete(pairId: string) {
    return this.eggRepository.softDelete(pairId);
  }
}
