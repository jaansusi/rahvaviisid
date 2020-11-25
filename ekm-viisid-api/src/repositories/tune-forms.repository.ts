import {DefaultCrudRepository} from '@loopback/repository';
import {TuneForms, TuneFormsRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TuneFormsRepository extends DefaultCrudRepository<
  TuneForms,
  typeof TuneForms.prototype.id,
  TuneFormsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TuneForms, dataSource);
  }
}
