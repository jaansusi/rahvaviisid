import {DefaultCrudRepository} from '@loopback/repository';
import {ActualPerformanceTypes, ActualPerformanceTypesRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ActualPerformanceTypesRepository extends DefaultCrudRepository<
  ActualPerformanceTypes,
  typeof ActualPerformanceTypes.prototype.id,
  ActualPerformanceTypesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(ActualPerformanceTypes, dataSource);
  }
}
