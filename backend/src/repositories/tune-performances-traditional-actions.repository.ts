import {DefaultCrudRepository} from '@loopback/repository';
import {TunePerformancesTraditionalActionsTypes, TunePerformancesTraditionalActionsRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TunePerformancesTraditionalActionsTypesRepository extends DefaultCrudRepository<
  TunePerformancesTraditionalActionsTypes,
  typeof TunePerformancesTraditionalActionsTypes.prototype.id,
  TunePerformancesTraditionalActionsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TunePerformancesTraditionalActionsTypes, dataSource);
  }
}
