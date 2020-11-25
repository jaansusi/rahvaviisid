import {DefaultCrudRepository} from '@loopback/repository';
import {VerseForms, VerseFormsRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class VerseFormsRepository extends DefaultCrudRepository<
  VerseForms,
  typeof VerseForms.prototype.id,
  VerseFormsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(VerseForms, dataSource);
  }
}
