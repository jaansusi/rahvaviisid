import {DefaultCrudRepository} from '@loopback/repository';
import {MusicalCharacteristicsRhythmTypes, MusicalCharacteristicsRhythmTypesRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MusicalCharacteristicsRhythmTypesRepository extends DefaultCrudRepository<
  MusicalCharacteristicsRhythmTypes,
  typeof MusicalCharacteristicsRhythmTypes.prototype.id,
  MusicalCharacteristicsRhythmTypesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(MusicalCharacteristicsRhythmTypes, dataSource);
  }
}
