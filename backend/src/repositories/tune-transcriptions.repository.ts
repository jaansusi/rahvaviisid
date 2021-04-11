import {DefaultCrudRepository, repository,HasOneRepositoryFactory,HasManyRepositoryFactory} from '@loopback/repository';
import {TuneTranscriptions, TuneTranscriptionsRelations, Tunes, TuneMelodies, TranscriptionSources} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TunesRepository} from './tunes.repository';
import {TuneMelodiesRepository} from './tune-melodies.repository';
import {TranscriptionSourcesRepository} from './transcription-sources.repository';

export class TuneTranscriptionsRepository extends DefaultCrudRepository<
  TuneTranscriptions,
  typeof TuneTranscriptions.prototype.id,
  TuneTranscriptionsRelations
> {

  public readonly tunes: HasOneRepositoryFactory<Tunes, typeof TuneTranscriptions.prototype.id>;
  public readonly tuneMelodies: HasManyRepositoryFactory<TuneMelodies, typeof Tunes.prototype.id>;

  public readonly transcriptionSources: HasOneRepositoryFactory<TranscriptionSources, typeof TuneTranscriptions.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('TuneMelodiesRepository') protected tuneMelodiesRepositoryGetter: Getter<TuneMelodiesRepository>, @repository.getter('TranscriptionSourcesRepository') protected transcriptionSourcesRepositoryGetter: Getter<TranscriptionSourcesRepository>,
  ) {
    super(TuneTranscriptions, dataSource);
    this.transcriptionSources = this.createHasOneRepositoryFactoryFor('transcriptionSources', transcriptionSourcesRepositoryGetter);
    this.registerInclusionResolver('transcriptionSources', this.transcriptionSources.inclusionResolver);
    this.tuneMelodies = this.createHasManyRepositoryFactoryFor('tuneMelodies', tuneMelodiesRepositoryGetter);
    this.registerInclusionResolver('tuneMelodies', this.tuneMelodies.inclusionResolver);
  }
}
