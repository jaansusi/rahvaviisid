import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {Parishes, ParishesRelations, Tunes, TunePlaces} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TunesRepository} from './tunes.repository';
import { TunePlacesRepository } from './tune-places.repository';

export class ParishesRepository extends DefaultCrudRepository<
  Parishes,
  typeof Parishes.prototype.id,
  ParishesRelations
> {

  public readonly tunesForClassificator: HasManyThroughRepositoryFactory<
  Tunes, 
  typeof Tunes.prototype.id,
  TunePlaces,
  typeof Parishes.prototype.id

  >;
 

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('TunesRepository')
    tunesRepositoryGetter: Getter<TunesRepository>,
    @repository.getter('TunePlacesRepository')
    tunePlacesRepositoryGetter: Getter<TunePlacesRepository>,
  ) {
    super(Parishes, dataSource);
    this.tunesForClassificator = this.createHasManyThroughRepositoryFactoryFor(
      'tunes',
      tunesRepositoryGetter,
      tunePlacesRepositoryGetter,     
    );
    this.registerInclusionResolver('tunesForClassificator', this.tunesForClassificator.inclusionResolver);
  }
}
