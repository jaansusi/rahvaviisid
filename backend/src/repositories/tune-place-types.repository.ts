import {DefaultCrudRepository} from '@loopback/repository';
import {TunePlaceTypes, TunePlaceTypesRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TunePlaceTypesRepository extends DefaultCrudRepository<
  TunePlaceTypes,
  typeof TunePlaceTypes.prototype.id,
  TunePlaceTypesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TunePlaceTypes, dataSource);
  }
}
