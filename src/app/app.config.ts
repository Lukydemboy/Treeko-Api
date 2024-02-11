import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dataSource from 'src/database/data-source';
import { ClutchEntity } from 'src/database/entities/clutch.entity';
import { EggEntity } from 'src/database/entities/egg.entity';
import { IncubatorEntity } from 'src/database/entities/incubator.entity';

export const typeOrmOptions: TypeOrmModuleOptions = {
  ...dataSource.options,
  autoLoadEntities: true,
  entities: [ClutchEntity, IncubatorEntity, EggEntity],
};
