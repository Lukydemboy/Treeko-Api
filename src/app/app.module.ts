import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmOptions } from './app.config';
import { AnimalModule } from './modules/animals/animal.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmOptions), AuthModule, AnimalModule],
  controllers: [],
})
export class AppModule {}
