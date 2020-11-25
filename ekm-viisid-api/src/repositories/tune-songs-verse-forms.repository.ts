import {DefaultCrudRepository} from '@loopback/repository';
import {TuneSongsVerseForms, TuneSongsVerseFormsRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TuneSongsVerseFormsRepository extends DefaultCrudRepository<
  TuneSongsVerseForms,
  typeof TuneSongsVerseForms.prototype.id,
  TuneSongsVerseFormsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TuneSongsVerseForms, dataSource);
  }
}
