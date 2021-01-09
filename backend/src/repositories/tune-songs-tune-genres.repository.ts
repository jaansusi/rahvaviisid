import {DefaultCrudRepository} from '@loopback/repository';
import {TuneSongsTuneGenres, TuneSongsTuneGenresRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TuneSongsTuneGenresRepository extends DefaultCrudRepository<
  TuneSongsTuneGenres,
  typeof TuneSongsTuneGenres.prototype.id,
  TuneSongsTuneGenresRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TuneSongsTuneGenres, dataSource);
  }
}
