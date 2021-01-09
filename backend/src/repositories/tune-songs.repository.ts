import {DefaultCrudRepository} from '@loopback/repository';
import {TuneSongs, TuneSongsRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TuneSongsRepository extends DefaultCrudRepository<
  TuneSongs,
  typeof TuneSongs.prototype.id,
  TuneSongsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TuneSongs, dataSource);
  }
}
