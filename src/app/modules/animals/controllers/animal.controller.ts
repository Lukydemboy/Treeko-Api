import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AUTH } from 'src/app/constants';
import { AnimalService } from '../services/animal.service';
import { AuthorizedRequest } from 'src/domain/types/jwt';

@ApiTags('animals')
@Controller('animals')
@UseGuards(AuthGuard(AUTH.ACCESS_TOKEN))
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Post()
  async create(@Req() req: AuthorizedRequest, @Body() body) {
    return this.animalService.create(body, req.user.id);
  }
}
