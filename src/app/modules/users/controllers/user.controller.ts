import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import {
  ApiAuthorizationHeader,
  TokenType,
} from 'src/app/decorators/api-authorization-header.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AUTH } from 'src/app/constants';
import { UserEntity } from 'src/database/entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  @UseGuards(AuthGuard(AUTH.ACCESS_TOKEN))
  @ApiAuthorizationHeader(TokenType.Access)
  getUser(@Req() req, @Param('userId') userId: string) {
    return this.userService.findById(userId);
  }

  @Patch(':userId')
  @UseGuards(AuthGuard(AUTH.ACCESS_TOKEN))
  @ApiAuthorizationHeader(TokenType.Access)
  updateUser(
    @Req() req,
    @Param('userId') userId: string,
    @Body() body: Partial<UserEntity>,
  ) {
    return this.userService.update(userId, body);
  }

  @Delete(':userId')
  @UseGuards(AuthGuard(AUTH.ACCESS_TOKEN))
  archiveUser(
    @Req() req: Request & { user: { id: string; accessToken: string } },
    @Param('userId') userId: string,
  ) {
    if (req.user.id !== userId) throw new ForbiddenException();

    return this.userService.archive(userId);
  }

  @Patch(':userId/push-token')
  @UseGuards(AuthGuard(AUTH.ACCESS_TOKEN))
  updatePushToken(
    @Req() req,
    @Param('userId') userId: string,
    @Body() body: { token: string },
  ) {
    return this.userService.updatePushToken(userId, body.token);
  }
}
