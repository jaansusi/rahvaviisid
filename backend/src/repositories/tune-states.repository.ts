import {DefaultCrudRepository} from '@loopback/repository';
import {TuneStates, TuneStatesRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TuneStatesRepository extends DefaultCrudRepository<
  TuneStates,
  typeof TuneStates.prototype.id,
  TuneStatesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TuneStates, dataSource);
  }
}
