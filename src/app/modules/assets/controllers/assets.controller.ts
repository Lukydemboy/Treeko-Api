import { Controller, UseGuards, Get, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AUTH } from 'src/app/constants';
import { AssetsService } from '../services/assets.service';

@ApiTags('assets')
@Controller('assets')
@UseGuards(AuthGuard(AUTH.ACCESS_TOKEN))
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get('/presigned-url')
  async getPresignedUrl(@Query('key') key: string) {
    return this.assetsService.getPresignedUrl(key);
  }
}
