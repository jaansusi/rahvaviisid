import {DefaultCrudRepository} from '@loopback/repository';
import {TuneTranscriptions, TuneTranscriptionsRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TuneTranscriptionsRepository extends DefaultCrudRepository<
  TuneTranscriptions,
  typeof TuneTranscriptions.prototype.id,
  TuneTranscriptionsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TuneTranscriptions, dataSource);
  }
}
