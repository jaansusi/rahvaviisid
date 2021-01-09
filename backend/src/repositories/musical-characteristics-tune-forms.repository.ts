import {DefaultCrudRepository} from '@loopback/repository';
import {MusicalCharacteristicsTuneForms, MusicalCharacteristicsTuneFormsRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MusicalCharacteristicsTuneFormsRepository extends DefaultCrudRepository<
  MusicalCharacteristicsTuneForms,
  typeof MusicalCharacteristicsTuneForms.prototype.id,
  MusicalCharacteristicsTuneFormsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(MusicalCharacteristicsTuneForms, dataSource);
  }
}
