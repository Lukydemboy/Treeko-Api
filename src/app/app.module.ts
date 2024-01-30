import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmOptions } from './app.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmOptions), AuthModule],
  controllers: [],
})
export class AppModule {}
