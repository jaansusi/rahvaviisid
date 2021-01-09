import {DefaultCrudRepository} from '@loopback/repository';
import {Municipalities, MunicipalitiesRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MunicipalitiesRepository extends DefaultCrudRepository<
  Municipalities,
  typeof Municipalities.prototype.id,
  MunicipalitiesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Municipalities, dataSource);
  }
}
