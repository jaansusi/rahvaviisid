import {DefaultCrudRepository} from '@loopback/repository';
import {TuneVariations, TuneVariationsRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TuneVariationsRepository extends DefaultCrudRepository<
  TuneVariations,
  typeof TuneVariations.prototype.id,
  TuneVariationsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TuneVariations, dataSource);
  }
}
