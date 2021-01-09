import {DefaultCrudRepository} from '@loopback/repository';
import {Measures, MeasuresRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MeasuresRepository extends DefaultCrudRepository<
  Measures,
  typeof Measures.prototype.id,
  MeasuresRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Measures, dataSource);
  }
}
