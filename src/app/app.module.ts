import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmOptions } from './app.config';
import { AnimalModule } from './modules/animals/animal.module';
import { PairModule } from './modules/pairs/pairs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmOptions),
    AuthModule,
    AnimalModule,
    PairModule,
  ],
  controllers: [],
})
export class AppModule {}
