import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VerificationTokenEntity } from 'src/database/entities/verification-token.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/database/entities/user.entity';

@Injectable()
export class VerificationTokenService {
  constructor(
    @InjectRepository(VerificationTokenEntity)
    private readonly verificationTokenRepository: Repository<VerificationTokenEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async createVerificationToken(email: string, checkUserVerified = true) {
    const user = await this.usersRepository.findOneBy({ email });

    if (!user)
      throw new ForbiddenException(
        `No user found when creating verification token (email: ${email})`,
      );

    if (user.verified && checkUserVerified)
      throw new ForbiddenException(
        `User already verified (email: ${email}) when creating verification token`,
      );

    // Delete previous verification tokens
    await this.verificationTokenRepository.softDelete({
      userId: user.id,
    });

    const verificationToken = bcrypt.hashSync(`${user.email}${Date.now()}`, 10);

    return this.verificationTokenRepository.save({
      token: verificationToken,
      userId: user.id,
    });
  }

  async getVerificationToken(userId: string) {
    return this.verificationTokenRepository.findOne({
      where: {
        userId,
      },
    });
  }

  async deleteVerificationTokens(userId: string) {
    return this.verificationTokenRepository.softDelete({
      userId,
    });
  }

  async verifyTokenForUserId(userId: string, token: string) {
    const verificationToken = await this.verificationTokenRepository.findOne({
      where: {
        userId,
        deletedAt: null,
      },
    });

    if (!verificationToken?.token)
      throw new ForbiddenException(
        `No verification token found for user id ${userId}`,
      );

    if (token !== verificationToken.token)
      throw new ForbiddenException(
        `Verification token mismatch for user id ${userId}`,
      );

    if (verificationToken.deletedAt)
      throw new UnauthorizedException(
        `Verification token deleted for user id ${userId}`,
      );

    await this.verificationTokenRepository.softDelete({
      userId,
    });
  }
}
