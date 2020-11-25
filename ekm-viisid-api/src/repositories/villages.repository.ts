import {DefaultCrudRepository} from '@loopback/repository';
import {Villages, VillagesRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class VillagesRepository extends DefaultCrudRepository<
  Villages,
  typeof Villages.prototype.id,
  VillagesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Villages, dataSource);
  }
}
