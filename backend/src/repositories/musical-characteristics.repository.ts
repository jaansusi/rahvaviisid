import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MusicalCharacteristics, MusicalCharacteristicsRelations, RhythmTypes, MusicalCharacteristicsRhythmTypes, SoundRanges, TextForms, MusicalCharacteristicsTextForms, TuneForms, MusicalCharacteristicsTuneForms} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {MusicalCharacteristicsRhythmTypesRepository} from './musical-characteristics-rhythm-types.repository';
import {RhythmTypesRepository} from './rhythm-types.repository';
import {MusicalCharacteristicsTextFormsRepository} from './musical-characteristics-text-forms.repository';
import {TextFormsRepository} from './text-forms.repository';
import {MusicalCharacteristicsTuneFormsRepository} from './musical-characteristics-tune-forms.repository';
import {TuneFormsRepository} from './tune-forms.repository';
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

  public readonly textForms: HasManyThroughRepositoryFactory<TextForms, typeof TextForms.prototype.id,
        MusicalCharacteristicsTextForms,
        typeof MusicalCharacteristics.prototype.id
      >;

  // public readonly tuneForms: HasManyThroughRepositoryFactory<TuneForms, typeof TuneForms.prototype.id,
  //     MusicalCharacteristicsTuneForms,
  //     typeof MusicalCharacteristics.prototype.id
  //   >;

  public readonly soundRanges: HasOneRepositoryFactory<SoundRanges, typeof MusicalCharacteristics.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, 
    @repository.getter('MusicalCharacteristicsRhythmTypesRepository') 
    protected musicalCharacteristicsRhythmTypesRepositoryGetter: Getter<MusicalCharacteristicsRhythmTypesRepository>, 
    @repository.getter('RhythmTypesRepository') protected rhythmTypesRepositoryGetter: Getter<RhythmTypesRepository>, 
    
    @repository.getter('MusicalCharacteristicsTextFormsRepository') 
    protected musicalCharacteristicsTextFormsRepositoryGetter: Getter<MusicalCharacteristicsTextFormsRepository>, 
    @repository.getter('TextFormsRepository') protected textFormsRepositoryGetter: Getter<TextFormsRepository>, 
    
    // @repository.getter('MusicalCharacteristicsTuneFormsRepository') 
    // protected musicalCharacteristicsTuneFormsRepositoryGetter: Getter<MusicalCharacteristicsTuneFormsRepository>, 
    // @repository.getter('TuneFormsRepository') protected tuneFormsRepositoryGetter: Getter<TuneFormsRepository>, 

    @repository.getter('SoundRangesRepository') protected soundRangesRepositoryGetter: Getter<SoundRangesRepository>,
  ) {
    super(MusicalCharacteristics, dataSource);
    this.soundRanges = this.createHasOneRepositoryFactoryFor('soundRanges', soundRangesRepositoryGetter);
    this.registerInclusionResolver('soundRanges', this.soundRanges.inclusionResolver);
    
    this.rhythmTypes = this.createHasManyThroughRepositoryFactoryFor('rhythmTypes', rhythmTypesRepositoryGetter, musicalCharacteristicsRhythmTypesRepositoryGetter,);
    this.registerInclusionResolver('rhythmTypes', this.rhythmTypes.inclusionResolver);

    this.textForms = this.createHasManyThroughRepositoryFactoryFor('textForms', textFormsRepositoryGetter, musicalCharacteristicsTextFormsRepositoryGetter,);
    this.registerInclusionResolver('textForms', this.textForms.inclusionResolver);

    // this.tuneForms = this.createHasManyThroughRepositoryFactoryFor('tuneForms', tuneFormsRepositoryGetter, musicalCharacteristicsTuneFormsRepositoryGetter,);
    // this.registerInclusionResolver('tuneForms', this.tuneForms.inclusionResolver);
  }
}
