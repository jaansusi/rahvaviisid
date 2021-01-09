import {DefaultCrudRepository} from '@loopback/repository';
import {TunePerformances, TunePerformancesRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TunePerformancesRepository extends DefaultCrudRepository<
  TunePerformances,
  typeof TunePerformances.prototype.id,
  TunePerformancesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TunePerformances, dataSource);
  }
}
