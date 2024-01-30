import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AUTH } from 'src/app/constants';
import { environment } from 'src/app/environment';
import { TokenBlacklistService } from '../services/token-blacklist.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  AUTH.REFRESH_TOKEN,
  2,
) {
  constructor(private readonly tokenBlacklistService: TokenBlacklistService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: environment.auth.accessToken.jwtSecret,
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: { sub: string }) {
    const refreshToken = req.headers.authorization.split(' ')[1];
    const isBlacklisted = await this.tokenBlacklistService.isBlacklisted(
      refreshToken,
    );

    if (isBlacklisted) throw new UnauthorizedException();

    return { id: payload.sub, refreshToken };
  }
}
