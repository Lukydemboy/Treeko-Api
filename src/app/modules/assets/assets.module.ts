import { Module } from '@nestjs/common';
import { AssetsService } from './services/assets.service';
import { AssetsController } from './controllers/assets.controller';

@Module({
  controllers: [AssetsController],
  providers: [AssetsService],
})
export class AssetsModule {}
