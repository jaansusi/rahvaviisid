import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {Municipalities, MunicipalitiesRelations, Tunes, TunePlaces} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TunesRepository} from './tunes.repository';
import { TunePlacesRepository } from './tune-places.repository';

export class MunicipalitiesRepository extends DefaultCrudRepository<
  Municipalities,
  typeof Municipalities.prototype.id,
  MunicipalitiesRelations
> {

  public readonly tunes: HasManyThroughRepositoryFactory<
  Tunes, 
  typeof Tunes.prototype.id,
  TunePlaces,
  typeof Municipalities.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('TunesRepository')
    tunesRepositoryGetter: Getter<TunesRepository>,
    @repository.getter('TunePlacesRepository')
    tunePlacesRepositoryGetter: Getter<TunePlacesRepository>,
  ) {
    super(Municipalities, dataSource);
    this.tunes = this.createHasManyThroughRepositoryFactoryFor(
      'tunes',
      tunesRepositoryGetter,
      tunePlacesRepositoryGetter,     
    );
    this.registerInclusionResolver('tunes', this.tunes.inclusionResolver);
  }
}
