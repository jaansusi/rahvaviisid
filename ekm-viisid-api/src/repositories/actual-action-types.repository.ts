import {DefaultCrudRepository} from '@loopback/repository';
import {ActualActionTypes, ActualActionTypesRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ActualActionTypesRepository extends DefaultCrudRepository<
  ActualActionTypes,
  typeof ActualActionTypes.prototype.id,
  ActualActionTypesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(ActualActionTypes, dataSource);
  }
}
