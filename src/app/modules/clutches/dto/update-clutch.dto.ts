import { IncubatorEntity } from 'src/database/entities/incubator.entity';
import { PairEntity } from 'src/database/entities/pair.entity';

export class UpdateClutchDto {
  name: string;
  incubator: IncubatorEntity;
}

export class CreateClutchDto {
  name: string;
  incubator: IncubatorEntity;
  pair: PairEntity;
}
