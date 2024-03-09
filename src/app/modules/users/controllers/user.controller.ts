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
import { AuthorizedRequest } from 'src/domain/types/jwt';
import { CompleteProfileDto, UserDto } from '../dtos/user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @UseGuards(AuthGuard(AUTH.ACCESS_TOKEN))
  @ApiAuthorizationHeader(TokenType.Access)
  getMe(@Req() req: AuthorizedRequest): Promise<UserDto> {
    return this.userService.findById(req.user.id);
  }

  @Patch('/complete-profile')
  @UseGuards(AuthGuard(AUTH.ACCESS_TOKEN))
  @ApiAuthorizationHeader(TokenType.Access)
  completeProfile(
    @Req() req: AuthorizedRequest,
    @Body() body: CompleteProfileDto,
  ): Promise<UserDto> {
    return this.userService.completeProfile(req.user.id, body);
  }

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

  @Get(':userId/animals')
  @UseGuards(AuthGuard(AUTH.ACCESS_TOKEN))
  @ApiAuthorizationHeader(TokenType.Access)
  getAnimals(@Req() req, @Param('userId') userId: string) {
    return this.userService.getAnimals(userId);
  }
}
