import {DefaultCrudRepository} from '@loopback/repository';
import {TuneSongsSongTopics, TuneSongsSongTopicsRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TuneSongsSongTopicsRepository extends DefaultCrudRepository<
  TuneSongsSongTopics,
  typeof TuneSongsSongTopics.prototype.id,
  TuneSongsSongTopicsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TuneSongsSongTopics, dataSource);
  }
}
