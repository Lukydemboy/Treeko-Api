import { environment } from 'src/app/environment';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mysql',
  host: environment.db.host,
  port: environment.db.port,
  username: environment.db.user,
  password: environment.db.password,
  database: environment.db.name,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*.js'],
  synchronize: true,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
