import {DefaultCrudRepository} from '@loopback/repository';
import {MusicalCharacteristics, MusicalCharacteristicsRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MusicalCharacteristicsRepository extends DefaultCrudRepository<
  MusicalCharacteristics,
  typeof MusicalCharacteristics.prototype.id,
  MusicalCharacteristicsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(MusicalCharacteristics, dataSource);
  }
}
