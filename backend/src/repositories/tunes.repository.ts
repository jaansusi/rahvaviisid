import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {Tunes, TunesRelations, TuneMelodies, TuneTranscriptions} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TuneMelodiesRepository} from './tune-melodies.repository';
import {TuneTranscriptionsRepository} from './tune-transcriptions.repository';

export class TunesRepository extends DefaultCrudRepository<
  Tunes,
  typeof Tunes.prototype.id,
  TunesRelations
> {

  public readonly tuneMelodies: HasManyRepositoryFactory<TuneMelodies, typeof Tunes.prototype.id>;
  public readonly tuneTranscriptions: HasManyRepositoryFactory<TuneTranscriptions, typeof Tunes.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, 
    @repository.getter('TuneMelodiesRepository') protected tuneMelodiesRepositoryGetter: Getter<TuneMelodiesRepository>,
    @repository.getter('TuneTranscriptionsRepository') protected tuneTranscriptionsRepositoryGetter: Getter<TuneTranscriptionsRepository>,
  ) {
    super(Tunes, dataSource);
    this.tuneMelodies = this.createHasManyRepositoryFactoryFor('tuneMelodies', tuneMelodiesRepositoryGetter);
    this.registerInclusionResolver('tuneMelodies', this.tuneMelodies.inclusionResolver);
    this.tuneTranscriptions = this.createHasManyRepositoryFactoryFor('tuneTranscriptions', tuneTranscriptionsRepositoryGetter);
    this.registerInclusionResolver('tuneTranscriptions', this.tuneTranscriptions.inclusionResolver);
  }
}
