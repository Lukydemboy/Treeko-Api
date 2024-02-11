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
import { ClutchesService } from '../services/clutches.service';
import { UpdateClutchDto } from '../dto/update-clutch.dto';

@ApiTags('clutches')
@Controller('clutches')
@UseGuards(AuthGuard(AUTH.ACCESS_TOKEN))
export class ClutchesController {
  constructor(private readonly clutchesService: ClutchesService) {}

  @Get()
  async getAll() {
    return this.clutchesService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.clutchesService.getById(id);
  }

  @Post()
  async create(@Req() req: AuthorizedRequest, @Body() body) {
    return this.clutchesService.create(body);
  }

  @Patch(':id')
  async update(@Body() body: UpdateClutchDto, @Param('id') id: string) {
    return this.clutchesService.update(body, id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.clutchesService.delete(id);
  }
}
