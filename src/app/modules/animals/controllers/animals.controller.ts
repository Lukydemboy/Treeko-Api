import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  ApiAuthorizationHeader,
  TokenType,
} from 'src/app/decorators/api-authorization-header.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AUTH } from 'src/app/constants';
import { AnimalsService } from '../services/animals.service';
import { CreateAnimalDto } from '../animal.dto';

@ApiTags('animals')
@Controller('animals')
@UseGuards(AuthGuard(AUTH.ACCESS_TOKEN))
@ApiAuthorizationHeader(TokenType.Access)
export class AnimalsController {
  constructor(private readonly animalService: AnimalsService) {}

  @Post()
  creatAnimal(@Body() body: CreateAnimalDto) {
    return this.animalService.createAnimal(body);
  }
}
