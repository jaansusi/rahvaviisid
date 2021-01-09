import {DefaultCrudRepository} from '@loopback/repository';
import {TuneGenres, TuneGenresRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TuneGenresRepository extends DefaultCrudRepository<
  TuneGenres,
  typeof TuneGenres.prototype.id,
  TuneGenresRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TuneGenres, dataSource);
  }
}
