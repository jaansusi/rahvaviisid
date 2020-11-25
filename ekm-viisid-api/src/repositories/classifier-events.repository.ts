import {DefaultCrudRepository} from '@loopback/repository';
import {ClassifierEvents, ClassifierEventsRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ClassifierEventsRepository extends DefaultCrudRepository<
  ClassifierEvents,
  typeof ClassifierEvents.prototype.id,
  ClassifierEventsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(ClassifierEvents, dataSource);
  }
}
