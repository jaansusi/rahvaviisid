import {DefaultCrudRepository} from '@loopback/repository';
import {TunePlaces, TunePlacesRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TunePlacesRepository extends DefaultCrudRepository<
  TunePlaces,
  typeof TunePlaces.prototype.id,
  TunePlacesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TunePlaces, dataSource);
  }
}
