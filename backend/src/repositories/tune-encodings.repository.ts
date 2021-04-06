import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {TuneEncodings, TuneEncodingsRelations, KeySignatures, SupportSounds, Measures, Pitches} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {KeySignaturesRepository} from './key-signatures.repository';
import {SupportSoundsRepository} from './support-sounds.repository';
import {MeasuresRepository} from './measures.repository';
import {PitchesRepository} from './pitches.repository';

export class TuneEncodingsRepository extends DefaultCrudRepository<
  TuneEncodings,
  typeof TuneEncodings.prototype.id,
  TuneEncodingsRelations
> {

  public readonly keySignatures: HasOneRepositoryFactory<KeySignatures, typeof TuneEncodings.prototype.id>;

  public readonly supportSounds: HasOneRepositoryFactory<SupportSounds, typeof TuneEncodings.prototype.id>;

  public readonly measures: HasOneRepositoryFactory<Measures, typeof TuneEncodings.prototype.id>;

  public readonly pitches: HasOneRepositoryFactory<Pitches, typeof TuneEncodings.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('KeySignaturesRepository') protected keySignaturesRepositoryGetter: Getter<KeySignaturesRepository>, @repository.getter('SupportSoundsRepository') protected supportSoundsRepositoryGetter: Getter<SupportSoundsRepository>, @repository.getter('MeasuresRepository') protected measuresRepositoryGetter: Getter<MeasuresRepository>, @repository.getter('PitchesRepository') protected pitchesRepositoryGetter: Getter<PitchesRepository>,
  ) {
    super(TuneEncodings, dataSource);
    this.pitches = this.createHasOneRepositoryFactoryFor('pitches', pitchesRepositoryGetter);
    this.registerInclusionResolver('pitches', this.pitches.inclusionResolver);
    this.measures = this.createHasOneRepositoryFactoryFor('measures', measuresRepositoryGetter);
    this.registerInclusionResolver('measures', this.measures.inclusionResolver);
    this.supportSounds = this.createHasOneRepositoryFactoryFor('supportSounds', supportSoundsRepositoryGetter);
    this.registerInclusionResolver('supportSounds', this.supportSounds.inclusionResolver);
    this.keySignatures = this.createHasOneRepositoryFactoryFor('keySignatures', keySignaturesRepositoryGetter);
    this.registerInclusionResolver('keySignatures', this.keySignatures.inclusionResolver);
  }
}
