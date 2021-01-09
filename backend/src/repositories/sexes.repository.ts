import {DefaultCrudRepository} from '@loopback/repository';
import {Sexes, SexesRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SexesRepository extends DefaultCrudRepository<
  Sexes,
  typeof Sexes.prototype.id,
  SexesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Sexes, dataSource);
  }
}
