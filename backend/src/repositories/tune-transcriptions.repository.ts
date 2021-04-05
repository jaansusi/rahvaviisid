import {DefaultCrudRepository, repository,HasOneRepositoryFactory,HasManyRepositoryFactory} from '@loopback/repository';
import {TuneTranscriptions, TuneTranscriptionsRelations, Tunes, TuneMelodies} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TunesRepository} from './tunes.repository';
import {TuneMelodiesRepository} from './tune-melodies.repository';

export class TuneTranscriptionsRepository extends DefaultCrudRepository<
  TuneTranscriptions,
  typeof TuneTranscriptions.prototype.id,
  TuneTranscriptionsRelations
> {

  public readonly tunes: HasOneRepositoryFactory<Tunes, typeof TuneTranscriptions.prototype.id>;
  public readonly tuneMelodies: HasManyRepositoryFactory<TuneMelodies, typeof Tunes.prototype.id>;


  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('TuneMelodiesRepository') protected tuneMelodiesRepositoryGetter: Getter<TuneMelodiesRepository>,
  ) {
    super(TuneTranscriptions, dataSource);
    this.tuneMelodies = this.createHasManyRepositoryFactoryFor('tuneMelodies', tuneMelodiesRepositoryGetter);
    this.registerInclusionResolver('tuneMelodies', this.tuneMelodies.inclusionResolver);
  }
}
