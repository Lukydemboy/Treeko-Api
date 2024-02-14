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
import { EggsService } from '../services/eggs.service';
import { UpdateEggDto } from '../dto/egg.dto';

@ApiTags('eggs')
@Controller('eggs')
@UseGuards(AuthGuard(AUTH.ACCESS_TOKEN))
export class EggsController {
  constructor(private readonly eggsService: EggsService) {}

  @Get()
  async getAll() {
    return this.eggsService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.eggsService.getById(id);
  }

  @Post()
  async create(@Req() req: AuthorizedRequest, @Body() body) {
    return this.eggsService.create(body);
  }

  @Patch(':id')
  async update(@Body() body: UpdateEggDto, @Param('id') id: string) {
    return this.eggsService.update(body, id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.eggsService.delete(id);
  }
}
