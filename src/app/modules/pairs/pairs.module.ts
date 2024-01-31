import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PairService } from './services/pair.service';
import { PairController } from './controllers/pair.controller';
import { PairEntity } from 'src/database/entities/pair.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PairEntity])],
  controllers: [PairController],
  providers: [PairService],
})
export class PairModule {}
