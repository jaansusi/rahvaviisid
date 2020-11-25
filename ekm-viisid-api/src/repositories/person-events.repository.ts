import {DefaultCrudRepository} from '@loopback/repository';
import {PersonEvents, PersonEventsRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PersonEventsRepository extends DefaultCrudRepository<
  PersonEvents,
  typeof PersonEvents.prototype.id,
  PersonEventsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(PersonEvents, dataSource);
  }
}
