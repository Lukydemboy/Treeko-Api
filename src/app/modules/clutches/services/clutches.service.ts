import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClutchDto, UpdateClutchDto } from '../dto/update-clutch.dto';
import { ClutchEntity } from 'src/database/entities/clutch.entity';

@Injectable()
export class ClutchesService {
  constructor(
    @InjectRepository(ClutchEntity)
    private readonly clutchRepository: Repository<ClutchEntity>,
  ) {}

  async getAll() {
    return this.clutchRepository.find();
  }

  async getById(id: string) {
    return this.clutchRepository.findOne({
      where: { id },
      relations: {
        incubator: true,
        pair: true,
      },
    });
  }

  async create(createPairDto: CreateClutchDto) {
    return this.clutchRepository.save(createPairDto);
  }

  async update(updateAnimalDto: UpdateClutchDto, pairId: string) {
    return this.clutchRepository.update(pairId, updateAnimalDto);
  }

  async delete(pairId: string) {
    return this.clutchRepository.softDelete(pairId);
  }
}
