import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { PairEntity } from 'src/database/entities/pair.entity';
import { CreatePairDto } from '../pair.dto';
import { AnimalEntity } from 'src/database/entities/animal.entity';

export class PairsService {
  constructor(
    @InjectRepository(PairEntity)
    private readonly pairsRepository: Repository<PairEntity>,
  ) {}

  async createPair(data: CreatePairDto): Promise<PairEntity> {
    const userEntity = new UserEntity();
    userEntity.id = data.userId;

    const maleAnimalEntity = new AnimalEntity();
    maleAnimalEntity.id = data.maleId;

    const femaleAnimalEntity = new AnimalEntity();
    femaleAnimalEntity.id = data.femaleId;

    return this.pairsRepository.save({
      ...data,
      male: maleAnimalEntity,
      female: femaleAnimalEntity,
      owner: userEntity,
    });
  }
}
