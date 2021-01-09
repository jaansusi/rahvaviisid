import {DefaultCrudRepository} from '@loopback/repository';
import {Languages, LanguagesRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class LanguagesRepository extends DefaultCrudRepository<
  Languages,
  typeof Languages.prototype.id,
  LanguagesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Languages, dataSource);
  }
}
