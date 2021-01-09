import {DefaultCrudRepository} from '@loopback/repository';
import {TextForms, TextFormsRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TextFormsRepository extends DefaultCrudRepository<
  TextForms,
  typeof TextForms.prototype.id,
  TextFormsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TextForms, dataSource);
  }
}
