import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmOptions } from './app.config';
import { AnimalsModule } from './modules/animals/animals.module';
import { UserModule } from './modules/users/user.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmOptions),
    AuthModule,
    UserModule,
    AnimalsModule,
  ],
  controllers: [],
})
export class AppModule {}
