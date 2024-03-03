import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dataSource from 'src/database/data-source';

export const typeOrmOptions: TypeOrmModuleOptions = {
  ...dataSource.options,
  autoLoadEntities: true,
};
