import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {basicAuthorization} from '../services';
import {
  Count,
  CountSchema,
  DefaultCrudRepository,
  Filter,
  FilterExcludingWhere,
  Repository,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {
  MusicalCharacteristics,
  TuneEncodings,
  TunePerformances,
  Tunes,
} from '../models';
import {
  ActualPerformanceTypesRepository,
  ExternalReferencesRepository,
  MusicalCharacteristicsRepository,
  MusicalCharacteristicsRhythmTypesRepository,
  RhythmTypesRepository,
  SoundRangesRepository,
  TuneEncodingsRepository,
  TuneMelodiesRepository,
  TunePerformancesRepository,
  TunePlacesRepository,
  TuneSongsRepository,
  TunesPersonsRolesRepository,
  TunesRepository,
  TuneTranscriptionsRepository,
} from '../repositories';

export class TunesController {
  constructor(
    @repository(TunesRepository)
    public tunesRepository: TunesRepository,
    @repository(TuneMelodiesRepository)
    public tuneMelodiesRepository: TuneMelodiesRepository,
    @repository(TuneEncodingsRepository)
    public tuneEncodingsRepository: TuneEncodingsRepository,
    @repository(TuneSongsRepository)
    public tuneSongsRepository: TuneSongsRepository,
    @repository(TunePerformancesRepository)
    public tunePerformancesRepository: TunePerformancesRepository,
    @repository(TunePlacesRepository)
    public tunePlacesRepository: TunePlacesRepository,
    @repository(TuneTranscriptionsRepository)
    public tuneTranscriptionsRepository: TuneTranscriptionsRepository,
    @repository(TunesPersonsRolesRepository)
    public tunesPersonsRolesRepository: TunesPersonsRolesRepository,
    @repository(ActualPerformanceTypesRepository)
    public actualPerformanceTypesRepository: ActualPerformanceTypesRepository,
    @repository(MusicalCharacteristicsRepository)
    public musicalCharacteristicsRepository: MusicalCharacteristicsRepository,
    @repository(RhythmTypesRepository)
    public rhythmTypesRepository: RhythmTypesRepository,
    @repository(MusicalCharacteristicsRhythmTypesRepository)
    public musicalCharacteristicsRhythmTypesRepository: MusicalCharacteristicsRhythmTypesRepository,
    @repository(SoundRangesRepository)
    public soundRangesRepository: SoundRangesRepository,
    @repository(ExternalReferencesRepository)
    public externalReferencesRepository: ExternalReferencesRepository,
  ) {}

  @post('/tunes', {
    responses: {
      '200': {
        description: 'Tunes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tunes)}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tunes, {
            includeRelations: true,
            partial: 'deep',
            title: 'NewTunes',
            exclude: ['id'],
          }),
        },
      },
    })
    tunes: Omit<Tunes, 'id'>,
  ): Promise<Tunes> {
    //-------------------
    //IMPORTANT: If you make any changes here, you need to also change updateById function!
    //-------------------

    //We need the tune created first, but for that, it can't have any nested "navigational" objects in it
    //so let's just assign them to variables for later use
    let externalReferences = tunes.externalReferences;
    delete tunes.externalReferences;
    let musicalCharacteristics = tunes.musicalCharacteristics;
    delete tunes.musicalCharacteristics;
    let tuneTranscriptions = tunes.tuneTranscriptions;
    delete tunes.tuneTranscriptions;
    let tuneEncodings = tunes.tuneEncodings;
    delete tunes.tuneEncodings;
    let tunesPersonsRoles = tunes.tunesPersonsRoles;
    delete tunes.tunesPersonsRoles;
    let tuneSongs = tunes.tuneSongs;
    delete tunes.tuneSongs;
    let tunePlaces = tunes.tunePlaces;
    delete tunes.tunePlaces;
    let tunePerformances = tunes.tunePerformances;
    delete tunes.tunePerformances;

    console.log(tunes);
    //First we need the actual tune so we can link through it's ID
    let createdTunes = await this.tunesRepository.create(tunes);
    return createdTunes;
    if (tunes.externalReferences !== undefined) {
      this.insertNestedAsset(
        tunes.externalReferences,
        this.externalReferencesRepository,
        createdTunes.id,
      );
    }

    if (tunes.musicalCharacteristics !== undefined) {
      let musicalCharacteristics = await this.insertNestedAsset(
        tunes.musicalCharacteristics,
        this.musicalCharacteristicsRepository,
        createdTunes.id,
      );
      musicalCharacteristics.forEach(
        (musicalCharacteristics: MusicalCharacteristics, i: number) => {
          let rhythmTypesPromise = this.insertNestedAsset(
            musicalCharacteristics.rhythmTypes,
            this.rhythmTypesRepository,
          );
          rhythmTypesPromise.then(rhythmTypes => {
            rhythmTypes.forEach(rhythmType => {
              this.insertNestedAsset(
                rhythmType,
                this.rhythmTypesRepository,
                musicalCharacteristics.id,
                'musicalCharacteristicsId',
                this.musicalCharacteristicsRhythmTypesRepository,
                'rhythmTypesId'
              )
            });
          });
          if (
            musicalCharacteristics.soundRangeId &&
            musicalCharacteristics.soundRanges
          )
            this.soundRangesRepository.create(
              musicalCharacteristics.soundRanges,
            );
          if (tunes.musicalCharacteristics) {
            delete tunes.musicalCharacteristics[i].rhythmTypes;
            delete tunes.musicalCharacteristics[i].soundRanges;
          }
        },
      );
      delete tunes.musicalCharacteristics;
    }

    // if (tunes.tuneTranscriptions !== undefined) {
    //   createNestedAsset(
    //     tunes.tuneTranscriptions,
    //     this.tuneTranscriptionsRepository,
    //   );
    //   
    // }

    // if (tunes.tuneEncodings !== undefined) {
    //   tunes.tuneEncodings.forEach((tuneEncodings: TuneEncodings, i: number) => {
    //     createNestedAsset(
    //       tuneEncodings.tuneMelodies,
    //       this.tuneMelodiesRepository,
    //     );
    //     if (tunes.tuneEncodings) delete tunes.tuneEncodings[i].tuneMelodies;
    //   });
    //   createNestedAsset(tunes.tuneEncodings, this.tuneEncodingsRepository);
    //   
    // }

    // if (tunes.tunesPersonsRoles !== undefined) {
    //   createNestedAsset(
    //     tunes.tunesPersonsRoles,
    //     this.tunesPersonsRolesRepository,
    //   );
    // }

    // if (tunes.tuneSongs !== undefined) {
    //   createNestedAsset(tunes.tuneSongs, this.tuneSongsRepository);
    //   
    // }

    // if (tunes.tunePlaces !== undefined) {
    //   createNestedAsset(tunes.tunePlaces, this.tunePlacesRepository);
    //   
    // }

    // if (tunes.tunePerformances !== undefined) {
    //   tunes.tunePerformances.forEach((performance: TunePerformances) => {
    //     if (performance.actualPerformanceTypes !== undefined) {
    //       createNestedAsset(
    //         [performance.actualPerformanceTypes],
    //         this.actualPerformanceTypesRepository,
    //       );
    //     }
    //   });
    //   
    // }

    return createdTunes;
  }

  @get('/tunes/count', {
    responses: {
      '200': {
        description: 'Tunes model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Tunes) where?: Where<Tunes>): Promise<Count> {
    return this.tunesRepository.count(where);
  }

  @get('/tunes', {
    responses: {
      '200': {
        description: 'Array of Tunes model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Tunes, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Tunes) filter?: Filter<Tunes>): Promise<Tunes[]> {
    return this.tunesRepository.find(filter);
  }

  @get('/tunes/{id}', {
    responses: {
      '200': {
        description: 'Tunes model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Tunes, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Tunes, {exclude: 'where'})
    filter?: FilterExcludingWhere<Tunes>,
  ): Promise<Tunes> {
    return this.tunesRepository.findById(id, filter);
  }

  @patch('/tunes/{id}', {
    responses: {
      '204': {
        description: 'Tunes PATCH success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tunes, {
            includeRelations: true,
            partial: 'deep',
          }),
        },
      },
    })
    tunes: Tunes,
  ): Promise<void> {
    //-------------------
    //IMPORTANT: If you make any changes here, you need to also change create function!
    //-------------------
    if (tunes.tunePerformances !== undefined) {
      tunes.tunePerformances.forEach(performance => {
        if (performance.actualPerformanceTypes !== undefined) {
          this.insertNestedAsset(
            [performance.actualPerformanceTypes],
            this.actualPerformanceTypesRepository,
          );
        }
      });
      delete tunes.tunePerformances;
    }
    if (tunes.tunePlaces !== undefined) {
      this.insertNestedAsset(tunes.tunePlaces, this.tunePlacesRepository);
      delete tunes.tunePlaces;
    }
    if (tunes.tuneSongs !== undefined) {
      this.insertNestedAsset(tunes.tuneSongs, this.tuneSongsRepository);
      delete tunes.tuneSongs;
    }
    if (tunes.tunesPersonsRoles !== undefined) {
      this.insertNestedAsset(
        tunes.tunesPersonsRoles,
        this.tunesPersonsRolesRepository,
      );
      delete tunes.tunesPersonsRoles;
    }
    if (tunes.tuneEncodings !== undefined) {
      tunes.tuneEncodings.forEach((tuneEncodings, i) => {
        this.insertNestedAsset(
          tuneEncodings.tuneMelodies,
          this.tuneMelodiesRepository,
        );
        if (tunes.tuneEncodings) delete tunes.tuneEncodings[i].tuneMelodies;
      });
      this.insertNestedAsset(tunes.tuneEncodings, this.tuneEncodingsRepository);
      delete tunes.tuneEncodings;
    }

    if (tunes.tuneTranscriptions !== undefined) {
      this.insertNestedAsset(
        tunes.tuneTranscriptions,
        this.tuneTranscriptionsRepository,
      );
      delete tunes.tuneTranscriptions;
    }

    if (tunes.musicalCharacteristics !== undefined) {
      tunes.musicalCharacteristics.forEach((musicalCharacteristics, i) => {
        this.insertNestedAsset(
          musicalCharacteristics.rhythmTypes,
          this.musicalCharacteristicsRepository,
        );
        if (
          musicalCharacteristics.soundRangeId &&
          musicalCharacteristics.soundRanges
        )
          this.soundRangesRepository.updateById(
            musicalCharacteristics.soundRangeId,
            musicalCharacteristics.soundRanges,
          );
        if (tunes.musicalCharacteristics) {
          delete tunes.musicalCharacteristics[i].rhythmTypes;
          delete tunes.musicalCharacteristics[i].soundRanges;
        }
      });
      this.insertNestedAsset(
        tunes.musicalCharacteristics,
        this.musicalCharacteristicsRepository,
      );
      delete tunes.musicalCharacteristics;
    }
    if (tunes.externalReferences !== undefined) {
      this.insertNestedAsset(
        tunes.externalReferences,
        this.externalReferencesRepository,
      );
      delete tunes.externalReferences;
    }

    await this.tunesRepository.updateById(id, tunes);
  }

  @del('/tunes/{id}', {
    responses: {
      '204': {
        description: 'Tunes DELETE success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tunesRepository.deleteById(id);
  }

  private async insertNestedAsset(
    assets: any[] | undefined,
    repository: DefaultCrudRepository<any, number, object>,
    externalId?: number,
    externalIdName: string = 'tunesId',
    mtmRepository?: DefaultCrudRepository<any, number, object>,
    secondaryExternalIdName?: string,
  ): Promise<any[]> {
    if (assets === undefined) return [];
    return assets.map((x: any) => {
      if (x.id) return repository.updateById(x.id, x);

      if (mtmRepository === undefined) x[externalIdName] = externalId;

      let createdAsset = repository.create(x);
      createdAsset.then(asset => {
        if (mtmRepository && secondaryExternalIdName) 
        mtmRepository.create({
          [externalIdName]: externalId,
          [secondaryExternalIdName]: asset.id
        });
      })
      
      return createdAsset;
    });
  }
}
