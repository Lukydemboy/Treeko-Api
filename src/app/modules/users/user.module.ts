import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { AnimalEntity } from 'src/database/entities/animal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AnimalEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
