import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClutchEntity } from 'src/database/entities/clutch.entity';
import { EggsController } from './controllers/eggs.controller';
import { EggsService } from './services/eggs.service';
import { EggEntity } from 'src/database/entities/egg.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EggEntity, ClutchEntity])],
  controllers: [EggsController],
  providers: [EggsService],
})
export class EggsModule {}
