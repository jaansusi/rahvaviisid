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
import {Tunes} from '../models';
import {
  ActualPerformanceTypesRepository,
  ExternalReferencesRepository,
  MusicalCharacteristicsRepository,
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
            title: 'NewTunes',
            exclude: ['id'],
          }),
        },
      },
    })
    tunes: Omit<Tunes, 'id'>,
  ): Promise<Tunes> {
    return this.tunesRepository.create(tunes);
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

  @patch('/tunes', {
    responses: {
      '200': {
        description: 'Tunes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tunes, {partial: true}),
        },
      },
    })
    tunes: Tunes,
    @param.where(Tunes) where?: Where<Tunes>,
  ): Promise<Count> {
    return this.tunesRepository.updateAll(tunes, where);
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
    let updateNestedAsset = (
      assets: any[] | undefined,
      repository: DefaultCrudRepository<any, number, object>,
    ) => {
      assets?.forEach((x: any) => {
        if (x.id === undefined)
          console.log(x);
        repository.updateById(x.id, x);
      });
    };
    // if (tunes.tuneEncodings !== undefined) {
    //   updateNestedAsset(tunes.tuneEncodings, this.tuneEncodingsRepository);
    //   delete tunes.tuneEncodings;
    // }
    if (tunes.tunePerformances !== undefined) {
      tunes.tunePerformances.forEach(performance => {
        if (performance.actualPerformanceTypes !== undefined) {
          updateNestedAsset(
            [performance.actualPerformanceTypes],
            this.actualPerformanceTypesRepository,
          );
        }
      });
      delete tunes.tunePerformances;
    }
    if (tunes.tunePlaces !== undefined) {
      updateNestedAsset(tunes.tunePlaces, this.tunePlacesRepository);
      delete tunes.tunePlaces;
    }
    if (tunes.tuneSongs !== undefined) {
      updateNestedAsset(tunes.tuneSongs, this.tuneSongsRepository);
      delete tunes.tuneSongs;
    }
    if (tunes.tunesPersonsRoles !== undefined) {
      updateNestedAsset(
        tunes.tunesPersonsRoles,
        this.tunesPersonsRolesRepository,
      );
      delete tunes.tunesPersonsRoles;
    }
    if (tunes.tuneEncodings !== undefined) {
      tunes.tuneEncodings.forEach((tuneEncodings, i) => {
        updateNestedAsset(
          tuneEncodings.tuneMelodies,
          this.tuneMelodiesRepository,
        );
        if (tunes.tuneEncodings)
          delete tunes.tuneEncodings[i].tuneMelodies;
      });
      updateNestedAsset(
        tunes.tuneEncodings,
        this.tuneEncodingsRepository,
      );
      delete tunes.tuneEncodings;
    }
    if (tunes.musicalCharacteristics !== undefined) {
      tunes.musicalCharacteristics.forEach((musicalCharacteristics, i) => {
        updateNestedAsset(
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
      updateNestedAsset(
        tunes.musicalCharacteristics,
        this.musicalCharacteristicsRepository,
      );
      delete tunes.musicalCharacteristics;
    }
    if (tunes.externalReferences !== undefined) {
      updateNestedAsset(tunes.externalReferences, this.externalReferencesRepository);
      delete tunes.externalReferences;
    }

    await this.tunesRepository.updateById(id, tunes);
  }

  @put('/tunes/{id}', {
    responses: {
      '204': {
        description: 'Tunes PUT success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tunes: Tunes,
  ): Promise<void> {
    await this.tunesRepository.replaceById(id, tunes);
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
}
