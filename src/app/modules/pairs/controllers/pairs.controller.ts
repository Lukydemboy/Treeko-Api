import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  ApiAuthorizationHeader,
  TokenType,
} from 'src/app/decorators/api-authorization-header.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AUTH } from 'src/app/constants';
import { CreatePairDto } from '../pair.dto';
import { PairsService } from '../services/pairs.service';

@ApiTags('pairs')
@Controller('pairs')
@UseGuards(AuthGuard(AUTH.ACCESS_TOKEN))
@ApiAuthorizationHeader(TokenType.Access)
export class PairsController {
  constructor(private readonly pairsService: PairsService) {}

  @Post()
  creatAnimal(@Body() body: CreatePairDto) {
    return this.pairsService.createPair(body);
  }
}
