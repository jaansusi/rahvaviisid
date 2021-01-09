import {DefaultCrudRepository} from '@loopback/repository';
import {RhythmTypes, RhythmTypesRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RhythmTypesRepository extends DefaultCrudRepository<
  RhythmTypes,
  typeof RhythmTypes.prototype.id,
  RhythmTypesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(RhythmTypes, dataSource);
  }
}
