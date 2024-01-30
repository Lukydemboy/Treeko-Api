import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from '../dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { AUTH } from 'src/app/constants';
import {
  ApiAuthorizationHeader,
  TokenType,
} from 'src/app/decorators/api-authorization-header.decorator';
import { MailingService } from '../services/mail.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailingService: MailingService,
  ) {}

  @Post('register')
  register(@Body() createAuthDto: RegisterDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('login')
  login(@Body() user: LoginDto) {
    return this.authService.login(user.email, user.password);
  }

  @Post('logout')
  @UseGuards(AuthGuard(AUTH.ACCESS_TOKEN))
  @ApiAuthorizationHeader(TokenType.Access)
  logout(@Req() req) {
    return this.authService.logout(req.user);
  }

  @Post('refresh')
  @UseGuards(AuthGuard(AUTH.REFRESH_TOKEN))
  // @ApiAuthorizationHeader(TokenType.Refresh)
  refreshTokens(
    @Req() req: Request & { user: { id: string; refreshToken: string } },
  ) {
    console.log('refreshing tokens', req.user.refreshToken);
    return this.authService.refreshTokens(req.user.id, req.user.refreshToken);
  }

  @Post('test-email')
  testEmail() {
    return this.mailingService.sendVerifyEmailMail(
      'lukasdemeyere@hotmail.com',
      'test',
    );
  }

  @Post('verify-email')
  verifyEmail(@Body() body: { email: string; token: string }) {
    return this.authService.verifyEmail(body.email, body.token);
  }

  @Post('change-password')
  @UseGuards(AuthGuard(AUTH.ACCESS_TOKEN))
  @ApiAuthorizationHeader(TokenType.Access)
  changePassword(
    @Req() req,
    @Body() data: { oldPassword: string; newPassword: string },
  ) {
    return this.authService.changePassword(
      req.user.id,
      data.oldPassword,
      data.newPassword,
    );
  }

  @Post('renew-verification-token')
  renewVerificationToken(@Body() data: { email: string }) {
    return this.authService.createNewVerificationToken(data.email);
  }

  @Post('forgot-password')
  forgotPassword(@Body() data: { email: string }) {
    return this.authService.forgotPassword(data.email);
  }

  @Post('reset-password')
  resetPassword(
    @Body() data: { email: string; token: string; password: string },
  ) {
    return this.authService.resetPassword(
      data.email,
      data.token,
      data.password,
    );
  }
}
