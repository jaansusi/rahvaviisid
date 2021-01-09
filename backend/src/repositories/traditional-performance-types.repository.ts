import {DefaultCrudRepository} from '@loopback/repository';
import {TraditionalPerformanceTypes, TraditionalPerformanceTypesRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TraditionalPerformanceTypesRepository extends DefaultCrudRepository<
  TraditionalPerformanceTypes,
  typeof TraditionalPerformanceTypes.prototype.id,
  TraditionalPerformanceTypesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TraditionalPerformanceTypes, dataSource);
  }
}
