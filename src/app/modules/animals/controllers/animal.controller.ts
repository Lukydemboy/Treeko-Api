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
import { AnimalService } from '../services/animal.service';
import { AuthorizedRequest } from 'src/domain/types/jwt';
import { UpdateAnimalDto } from '../dto/animal.dto';

@ApiTags('animals')
@Controller('animals')
@UseGuards(AuthGuard(AUTH.ACCESS_TOKEN))
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Get()
  async getAll() {
    return this.animalService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.animalService.getById(id);
  }

  @Post()
  async create(@Req() req: AuthorizedRequest, @Body() body) {
    return this.animalService.create(body, req.user.id);
  }

  @Patch(':id')
  async update(@Body() body: UpdateAnimalDto, @Param('id') id: string) {
    return this.animalService.update(body, id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.animalService.delete(id);
  }
}
