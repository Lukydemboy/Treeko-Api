import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthTokensDto, RegisterDto } from '../dto/auth.dto';
import { environment } from 'src/app/environment';
import { TokenBlacklistService } from './token-blacklist.service';
import { VerificationTokenService } from './verification-token.service';
import { MailingService } from './mail.service';

type LoginDto = {
  accessToken: string;
  refreshToken: string;
};

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly tokenBlacklistService: TokenBlacklistService,
    private readonly verificationTokenService: VerificationTokenService,
    private readonly mailingService: MailingService,
  ) {}

  async register(createUserDto: RegisterDto): Promise<UserEntity> {
    await this.userRepository
      .exists({
        where: {
          email: createUserDto.email,
        },
      })
      .then((exists) => {
        if (exists)
          throw new ConflictException(
            'This email is already in use. Try logging in or resetting your password.',
          );
      });

    const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);

    const createdUser = await this.userRepository.save({
      ...createUserDto,
      password: hashedPassword,
    });

    await this.createNewVerificationToken(createUserDto.email);

    delete createdUser.password;
    return createdUser;
  }

  private loginInternal(user: UserEntity): Promise<LoginDto> {
    if (user.deletedAt) throw new UnauthorizedException();

    return this.issueTokens(user.id);
  }

  private async issueTokens(userId: string): Promise<LoginDto> {
    const payload = { sub: userId };

    const accessToken = this.jwtService.sign(payload, {
      secret: environment.auth.accessToken.jwtSecret,
      expiresIn: environment.auth.accessToken.jwtExpirationTime,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: environment.auth.refreshToken.jwtSecret,
      expiresIn: environment.auth.refreshToken.jwtExpirationTime,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  login(email: string, password: string): Promise<LoginDto> {
    return this.userRepository.findOneByOrFail({ email }).then(async (user) => {
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      if (!user.password) {
        throw new BadRequestException('Password is required');
      }

      if (!bcrypt.compareSync(password, user.password)) {
        console.log('password mismatch');
        throw new UnauthorizedException('Invalid credentials');
      }

      if (!user.verified) {
        const token =
          await this.verificationTokenService.createVerificationToken(
            user.email,
          );

        await this.mailingService.sendVerifyEmailMail(user.email, token.token);

        throw new UnauthorizedException(
          'User is not verified, we sent you an email with a link to verify your account.',
        );
      }

      return this.loginInternal(user);
    });
  }

  logout(refreshToken: string): Promise<void> {
    return this.tokenBlacklistService
      .blacklist(refreshToken)
      .then(() => undefined);
  }

  refreshTokens(userId: string, refreshToken: string): Promise<AuthTokensDto> {
    return this.tokenBlacklistService
      .isBlacklisted(refreshToken)
      .then((isBlacklisted) => {
        if (isBlacklisted) {
          throw new UnauthorizedException();
        }

        return this.issueTokens(userId);
      });
  }

  changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<UpdateResult> {
    return this.userRepository
      .findOneOrFail({ where: { id: userId } })
      .then((user) => {
        if (!user) throw new NotFoundException();

        if (!user.password) throw new BadRequestException();

        if (!bcrypt.compareSync(oldPassword, user.password))
          throw new UnauthorizedException();

        const hashedPassword = bcrypt.hashSync(newPassword, 10);

        return this.userRepository.update(userId, {
          password: hashedPassword,
        });
      });
  }

  async verifyEmail(email: string, token: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user)
      throw new ForbiddenException(
        `No user found when verifying (email: ${email})`,
      );

    if (user.verified) {
      await this.verificationTokenService.deleteVerificationTokens(user.id);
      return;
    }

    await this.verificationTokenService.verifyTokenForUserId(user.id, token);

    user.verified = true;
    await this.userRepository.save(user);
    await this.verificationTokenService.deleteVerificationTokens(user.id);
  }

  createNewVerificationToken = async (email: string): Promise<void> => {
    const verificationToken =
      await this.verificationTokenService.createVerificationToken(email);

    this.mailingService.sendVerifyEmailMail(email, verificationToken.token);
  };

  forgotPassword = async (email: string): Promise<void> => {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) throw new NotFoundException();

    const verificationToken =
      await this.verificationTokenService.createVerificationToken(email, false);

    await this.mailingService.sendForgotPasswordMail(
      email,
      verificationToken.token,
    );
  };

  resetPassword = async (
    email: string,
    token: string,
    password: string,
  ): Promise<void> => {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) throw new NotFoundException();

    await this.verificationTokenService.verifyTokenForUserId(user.id, token);

    const hashedPassword = bcrypt.hashSync(password, 10);

    await this.userRepository.update(user.id, {
      password: hashedPassword,
    });

    await this.mailingService.sendPasswordIsResetMail(email, token);
  };
}
