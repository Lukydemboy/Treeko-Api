import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../users/services/user.service';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { TokenBlacklistService } from './services/token-blacklist.service';
import { TokenBlacklistEntity } from 'src/database/entities/token-blacklist.entity';
import { UserController } from '../users/controllers/user.controller';
import { MailingService } from './services/mail.service';
import { VerificationTokenEntity } from 'src/database/entities/verification-token.entity';
import { VerificationTokenService } from './services/verification-token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      TokenBlacklistEntity,
      VerificationTokenEntity,
    ]),
    PassportModule,
    // Options overriden in access-token.strategy.ts and refresh-token.strategy.ts
    JwtModule.register({}),
  ],
  controllers: [AuthController, UserController],
  providers: [
    AuthService,
    TokenBlacklistService,
    UserService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    MailingService,
    VerificationTokenService,
  ],
})
export class AuthModule {}
