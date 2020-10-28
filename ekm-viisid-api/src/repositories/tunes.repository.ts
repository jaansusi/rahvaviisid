import {DefaultCrudRepository} from '@loopback/repository';
import {Tunes, TunesRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TunesRepository extends DefaultCrudRepository<
  Tunes,
  typeof Tunes.prototype.id,
  TunesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Tunes, dataSource);
  }
}
