import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalsController } from './controllers/animals.controller';
import { AnimalsService } from './services/animals.service';
import { AnimalEntity } from 'src/database/entities/animal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnimalEntity])],
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule {}
