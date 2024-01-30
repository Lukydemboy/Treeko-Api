import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenBlacklistEntity } from 'src/database/entities/token-blacklist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TokenBlacklistService {
  constructor(
    @InjectRepository(TokenBlacklistEntity)
    private readonly tokenBlacklistRepository: Repository<TokenBlacklistEntity>,
  ) {}

  async blacklist(token: string): Promise<TokenBlacklistEntity> {
    return this.tokenBlacklistRepository.create({ token });
  }

  async isBlacklisted(token: string): Promise<boolean> {
    return this.tokenBlacklistRepository.exist({ where: { token } });
  }
}
