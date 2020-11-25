import {DefaultCrudRepository} from '@loopback/repository';
import {TuneSongsSongGenres, TuneSongsSongGenresRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TuneSongsSongGenresRepository extends DefaultCrudRepository<
  TuneSongsSongGenres,
  typeof TuneSongsSongGenres.prototype.id,
  TuneSongsSongGenresRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TuneSongsSongGenres, dataSource);
  }
}
