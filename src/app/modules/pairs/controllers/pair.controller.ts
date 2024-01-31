import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Patch,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AUTH } from 'src/app/constants';
import { AuthorizedRequest } from 'src/domain/types/jwt';
import { UpdatePairDto } from '../dto/pair.dto';
import { PairService } from '../services/pair.service';

@ApiTags('pairs')
@Controller('pairs')
@UseGuards(AuthGuard(AUTH.ACCESS_TOKEN))
export class PairController {
  constructor(private readonly pairService: PairService) {}

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.pairService.get(id);
  }

  @Post()
  async create(@Req() req: AuthorizedRequest, @Body() body) {
    return this.pairService.create(body, req.user.id);
  }

  @Patch(':id')
  async update(@Body() body: UpdatePairDto, @Param('id') id: string) {
    return this.pairService.update(body, id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.pairService.delete(id);
  }
}
