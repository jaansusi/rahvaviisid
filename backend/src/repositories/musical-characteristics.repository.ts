import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MusicalCharacteristics, MusicalCharacteristicsRelations, RhythmTypes, MusicalCharacteristicsRhythmTypes} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {MusicalCharacteristicsRhythmTypesRepository} from './musical-characteristics-rhythm-types.repository';
import {RhythmTypesRepository} from './rhythm-types.repository';

export class MusicalCharacteristicsRepository extends DefaultCrudRepository<
  MusicalCharacteristics,
  typeof MusicalCharacteristics.prototype.id,
  MusicalCharacteristicsRelations
> {

  public readonly rhythmTypes: HasManyThroughRepositoryFactory<RhythmTypes, typeof RhythmTypes.prototype.id,
          MusicalCharacteristicsRhythmTypes,
          typeof MusicalCharacteristics.prototype.id
        >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('MusicalCharacteristicsRhythmTypesRepository') protected musicalCharacteristicsRhythmTypesRepositoryGetter: Getter<MusicalCharacteristicsRhythmTypesRepository>, @repository.getter('RhythmTypesRepository') protected rhythmTypesRepositoryGetter: Getter<RhythmTypesRepository>,
  ) {
    super(MusicalCharacteristics, dataSource);
    this.rhythmTypes = this.createHasManyThroughRepositoryFactoryFor('rhythmTypes', rhythmTypesRepositoryGetter, musicalCharacteristicsRhythmTypesRepositoryGetter,);
    this.registerInclusionResolver('rhythmTypes', this.rhythmTypes.inclusionResolver);
  }
}
