import {DefaultCrudRepository} from '@loopback/repository';
import {Countries, CountriesRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CountriesRepository extends DefaultCrudRepository<
  Countries,
  typeof Countries.prototype.id,
  CountriesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Countries, dataSource);
  }
}
