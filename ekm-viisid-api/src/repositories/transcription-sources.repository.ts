import {DefaultCrudRepository} from '@loopback/repository';
import {TranscriptionSources, TranscriptionSourcesRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TranscriptionSourcesRepository extends DefaultCrudRepository<
  TranscriptionSources,
  typeof TranscriptionSources.prototype.id,
  TranscriptionSourcesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TranscriptionSources, dataSource);
  }
}
