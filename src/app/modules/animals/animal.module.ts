import { Module } from '@nestjs/common';
import { AnimalController } from './controllers/animal.controller';
import { AnimalService } from './services/animal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalEntity } from 'src/database/entities/animal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnimalEntity])],
  controllers: [AnimalController],
  providers: [AnimalService],
})
export class AnimalModule {}
