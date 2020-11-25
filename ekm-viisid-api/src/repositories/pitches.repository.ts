import {DefaultCrudRepository} from '@loopback/repository';
import {Pitches, PitchesRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PitchesRepository extends DefaultCrudRepository<
  Pitches,
  typeof Pitches.prototype.id,
  PitchesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Pitches, dataSource);
  }
}
