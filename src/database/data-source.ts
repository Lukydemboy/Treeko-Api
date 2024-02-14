import { environment } from 'src/app/environment';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mysql',
  host: environment.db.host,
  port: environment.db.port,
  username: environment.db.user,
  password: environment.db.password,
  database: environment.db.name,
  entities: [],
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
