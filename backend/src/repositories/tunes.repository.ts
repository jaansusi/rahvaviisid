import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {Tunes, TunesRelations, TuneMelodies} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TuneMelodiesRepository} from './tune-melodies.repository';

export class TunesRepository extends DefaultCrudRepository<
  Tunes,
  typeof Tunes.prototype.id,
  TunesRelations
> {

  public readonly tuneMelodies: HasManyRepositoryFactory<TuneMelodies, typeof Tunes.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TuneMelodiesRepository') protected tuneMelodiesRepositoryGetter: Getter<TuneMelodiesRepository>,
  ) {
    super(Tunes, dataSource);
    this.tuneMelodies = this.createHasManyRepositoryFactoryFor('tuneMelodies', tuneMelodiesRepositoryGetter);
    this.registerInclusionResolver('tuneMelodies', this.tuneMelodies.inclusionResolver);
  }
}
