import {DefaultCrudRepository} from '@loopback/repository';
import {TuneEvents, TuneEventsRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TuneEventsRepository extends DefaultCrudRepository<
  TuneEvents,
  typeof TuneEvents.prototype.id,
  TuneEventsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TuneEvents, dataSource);
  }
}
