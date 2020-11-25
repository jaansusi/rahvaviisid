import {DefaultCrudRepository} from '@loopback/repository';
import {MusicalCharacteristicsTextForms, MusicalCharacteristicsTextFormsRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MusicalCharacteristicsTextFormsRepository extends DefaultCrudRepository<
  MusicalCharacteristicsTextForms,
  typeof MusicalCharacteristicsTextForms.prototype.id,
  MusicalCharacteristicsTextFormsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(MusicalCharacteristicsTextForms, dataSource);
  }
}
