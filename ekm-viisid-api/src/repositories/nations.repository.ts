import {DefaultCrudRepository} from '@loopback/repository';
import {Nations, NationsRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class NationsRepository extends DefaultCrudRepository<
  Nations,
  typeof Nations.prototype.id,
  NationsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Nations, dataSource);
  }
}
