import {DefaultCrudRepository} from '@loopback/repository';
import {TunePerformancesTraditionalActions, TunePerformancesTraditionalActionsRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TunePerformancesTraditionalActionsRepository extends DefaultCrudRepository<
  TunePerformancesTraditionalActions,
  typeof TunePerformancesTraditionalActions.prototype.id,
  TunePerformancesTraditionalActionsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TunePerformancesTraditionalActions, dataSource);
  }
}
