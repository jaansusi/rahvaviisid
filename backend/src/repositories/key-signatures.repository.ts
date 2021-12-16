import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {KeySignatures, KeySignaturesRelations, Tunes, TuneEncodings} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TunesRepository} from './tunes.repository';
import {TuneEncodingsRepository } from './tune-encodings.repository';

export class KeySignaturesRepository extends DefaultCrudRepository<
  KeySignatures,
  typeof KeySignatures.prototype.id,
  KeySignaturesRelations
> {
  public readonly tunes: HasManyThroughRepositoryFactory<
  Tunes, 
  typeof Tunes.prototype.id,
  TuneEncodings,
  typeof KeySignatures.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('TunesRepository')
    tunesRepositoryGetter: Getter<TunesRepository>,
    @repository.getter('TuneEncodingsRepository')
    tuneEncodingsRepository: Getter<TuneEncodingsRepository>,
  ) {
    super(KeySignatures, dataSource);
    this.tunes = this.createHasManyThroughRepositoryFactoryFor(
      'tunes',
      tunesRepositoryGetter,
      tuneEncodingsRepository,     
    );
    this.registerInclusionResolver('tunes', this.tunes.inclusionResolver);
  }
}
