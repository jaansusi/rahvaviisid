import {DefaultCrudRepository} from '@loopback/repository';
import {TraditionalActionTypes, TraditionalActionTypesRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TraditionalActionTypesRepository extends DefaultCrudRepository<
  TraditionalActionTypes,
  typeof TraditionalActionTypes.prototype.id,
  TraditionalActionTypesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TraditionalActionTypes, dataSource);
  }
}
