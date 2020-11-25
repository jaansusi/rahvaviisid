import {DefaultCrudRepository} from '@loopback/repository';
import {SongTopics, SongTopicsRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SongTopicsRepository extends DefaultCrudRepository<
  SongTopics,
  typeof SongTopics.prototype.id,
  SongTopicsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(SongTopics, dataSource);
  }
}
