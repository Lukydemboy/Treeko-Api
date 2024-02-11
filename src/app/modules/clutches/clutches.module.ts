import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClutchEntity } from 'src/database/entities/clutch.entity';
import { ClutchesController } from './controllers/clutches.controller';
import { ClutchesService } from './services/clutches.service';
import { PairEntity } from 'src/database/entities/pair.entity';
import { IncubatorEntity } from 'src/database/entities/incubator.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClutchEntity, PairEntity, IncubatorEntity]),
  ],
  controllers: [ClutchesController],
  providers: [ClutchesService],
})
export class ClutchesModule {}