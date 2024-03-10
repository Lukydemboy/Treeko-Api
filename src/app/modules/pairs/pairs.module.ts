import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PairEntity } from 'src/database/entities/pair.entity';
import { PairsController } from './controllers/pairs.controller';
import { PairsService } from './services/pairs.service';

@Module({
  imports: [TypeOrmModule.forFeature([PairEntity])],
  controllers: [PairsController],
  providers: [PairsService],
})
export class PairsModule {}
