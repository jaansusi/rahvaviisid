import {DefaultCrudRepository} from '@loopback/repository';
import {Parishes, ParishesRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ParishesRepository extends DefaultCrudRepository<
  Parishes,
  typeof Parishes.prototype.id,
  ParishesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Parishes, dataSource);
  }
}
