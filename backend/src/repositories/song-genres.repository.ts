import {DefaultCrudRepository} from '@loopback/repository';
import {SongGenres, SongGenresRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SongGenresRepository extends DefaultCrudRepository<
  SongGenres,
  typeof SongGenres.prototype.id,
  SongGenresRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(SongGenres, dataSource);
  }
}
