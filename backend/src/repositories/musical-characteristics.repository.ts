import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MusicalCharacteristics, MusicalCharacteristicsRelations, RhythmTypes, MusicalCharacteristicsRhythmTypes, SoundRanges} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {MusicalCharacteristicsRhythmTypesRepository} from './musical-characteristics-rhythm-types.repository';
import {RhythmTypesRepository} from './rhythm-types.repository';
import {SoundRangesRepository} from './sound-ranges.repository';

export class MusicalCharacteristicsRepository extends DefaultCrudRepository<
  MusicalCharacteristics,
  typeof MusicalCharacteristics.prototype.id,
  MusicalCharacteristicsRelations
> {

  public readonly rhythmTypes: HasManyThroughRepositoryFactory<RhythmTypes, typeof RhythmTypes.prototype.id,
          MusicalCharacteristicsRhythmTypes,
          typeof MusicalCharacteristics.prototype.id
        >;

  public readonly soundRanges: HasOneRepositoryFactory<SoundRanges, typeof MusicalCharacteristics.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('MusicalCharacteristicsRhythmTypesRepository') protected musicalCharacteristicsRhythmTypesRepositoryGetter: Getter<MusicalCharacteristicsRhythmTypesRepository>, @repository.getter('RhythmTypesRepository') protected rhythmTypesRepositoryGetter: Getter<RhythmTypesRepository>, @repository.getter('SoundRangesRepository') protected soundRangesRepositoryGetter: Getter<SoundRangesRepository>,
  ) {
    super(MusicalCharacteristics, dataSource);
    this.soundRanges = this.createHasOneRepositoryFactoryFor('soundRanges', soundRangesRepositoryGetter);
    this.registerInclusionResolver('soundRanges', this.soundRanges.inclusionResolver);
    this.rhythmTypes = this.createHasManyThroughRepositoryFactoryFor('rhythmTypes', rhythmTypesRepositoryGetter, musicalCharacteristicsRhythmTypesRepositoryGetter,);
    this.registerInclusionResolver('rhythmTypes', this.rhythmTypes.inclusionResolver);
  }
}
