import {DefaultCrudRepository, repository,HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {TuneTranscriptions, TuneTranscriptionsRelations, Tunes, TranscriptionSources, TranscriptionsPersonsRoles} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TunesRepository} from './tunes.repository';

import {TranscriptionSourcesRepository} from './transcription-sources.repository';
import {TranscriptionsPersonsRolesRepository} from './transcriptions-persons-roles.repository';

export class TuneTranscriptionsRepository extends DefaultCrudRepository<
  TuneTranscriptions,
  typeof TuneTranscriptions.prototype.id,
  TuneTranscriptionsRelations
> {

  public readonly tunes: HasOneRepositoryFactory<Tunes, typeof TuneTranscriptions.prototype.id>;
  public readonly transcriptionSources: HasOneRepositoryFactory<TranscriptionSources, typeof TuneTranscriptions.prototype.id>;

  public readonly transcriptionsPersonsRoles: HasManyRepositoryFactory<TranscriptionsPersonsRoles, typeof TuneTranscriptions.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('TranscriptionSourcesRepository') protected transcriptionSourcesRepositoryGetter: Getter<TranscriptionSourcesRepository>, @repository.getter('TranscriptionsPersonsRolesRepository') protected transcriptionsPersonsRolesRepositoryGetter: Getter<TranscriptionsPersonsRolesRepository>,
  ) {
    super(TuneTranscriptions, dataSource);
    this.transcriptionsPersonsRoles = this.createHasManyRepositoryFactoryFor('transcriptionsPersonsRoles', transcriptionsPersonsRolesRepositoryGetter,);
    this.registerInclusionResolver('transcriptionsPersonsRoles', this.transcriptionsPersonsRoles.inclusionResolver);
    this.transcriptionSources = this.createHasOneRepositoryFactoryFor('transcriptionSources', transcriptionSourcesRepositoryGetter);
    this.registerInclusionResolver('transcriptionSources', this.transcriptionSources.inclusionResolver);

  }
}
