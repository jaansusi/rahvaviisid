import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {Villages, VillagesRelations, Tunes, TunePlaces} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TunesRepository} from './tunes.repository';
import { TunePlacesRepository } from './tune-places.repository';

export class VillagesRepository extends DefaultCrudRepository<
  Villages,
  typeof Villages.prototype.id,
  VillagesRelations
> {

  public readonly tunes: HasManyThroughRepositoryFactory<
  Tunes, 
  typeof Tunes.prototype.id,
  TunePlaces,
  typeof Villages.prototype.id

  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('TunesRepository')
    tunesRepositoryGetter: Getter<TunesRepository>,
    @repository.getter('TunePlacesRepository')
    tunePlacesRepositoryGetter: Getter<TunePlacesRepository>,
  ) {
    super(Villages, dataSource);
    this.tunes = this.createHasManyThroughRepositoryFactoryFor(
      'tunes',
      tunesRepositoryGetter,
      tunePlacesRepositoryGetter,     
    );
    this.registerInclusionResolver('tunes', this.tunes.inclusionResolver);

  }
}
