import {DefaultCrudRepository} from '@loopback/repository';
import {SoundRanges, SoundRangesRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SoundRangesRepository extends DefaultCrudRepository<
  SoundRanges,
  typeof SoundRanges.prototype.id,
  SoundRangesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(SoundRanges, dataSource);
  }
}
