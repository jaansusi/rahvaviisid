import {DefaultCrudRepository} from '@loopback/repository';
import {TuneEncodings, TuneEncodingsRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TuneEncodingsRepository extends DefaultCrudRepository<
  TuneEncodings,
  typeof TuneEncodings.prototype.id,
  TuneEncodingsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TuneEncodings, dataSource);
  }
}
