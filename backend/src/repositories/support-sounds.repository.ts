import {DefaultCrudRepository} from '@loopback/repository';
import {SupportSounds, SupportSoundsRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SupportSoundsRepository extends DefaultCrudRepository<
  SupportSounds,
  typeof SupportSounds.prototype.id,
  SupportSoundsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(SupportSounds, dataSource);
  }
}
