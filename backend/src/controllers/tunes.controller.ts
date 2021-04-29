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
import {SexesRelations, Tunes} from '../models';
import {
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
  ) {}

  @post('/tunes', {
    responses: {
      '200': {
        description: 'Tunes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tunes)}},
      },
    },
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
        repository.updateById(x.id, x);
      });
    };
    if (tunes.tuneEncodings !== undefined) {
      updateNestedAsset(tunes.tuneEncodings, this.tuneEncodingsRepository);
      delete tunes.tuneEncodings;
    }
    if (tunes.tunePerformances !== undefined) {
      // tunes.tunePerformances.forEach((performance) => {
      //   if (performance.actualPerformanceTypes !== undefined) {
      //     updateNestedAsset(performance.actualPerformanceTypes, this.actualPerformanceTypesRepository);
      //   }
      // });
      delete tunes.tunePerformances;
    }
    if (tunes.tunePlaces !== undefined) {
      //updateNestedAsset(tunes.tunePlaces, this.tunePlacesRepository);
      delete tunes.tunePlaces;
    }
    if (tunes.tuneSongs !== undefined) {
      updateNestedAsset(tunes.tuneSongs, this.tuneSongsRepository);
      delete tunes.tuneSongs;
    }
    if (tunes.tunesPersonsRoles !== undefined) {
      //updateNestedAsset(tunes.tunesPersonsRoles, this.tunesPersonsRolesRepository);
      delete tunes.tunesPersonsRoles;
    }
    if (tunes.tuneTranscriptions !== undefined) {
      // if (tunes.tuneMelodies !== undefined) {
      //   updateNestedAsset(tunes.tuneMelodies, this.tuneMelodiesRepository);
      //   delete tunes.tuneMelodies;
      // }
      //updateNestedAsset(tunes.tuneTranscriptions, this.tuneTranscriptionsRepository);
      delete tunes.tuneTranscriptions;
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
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tunesRepository.deleteById(id);
  }
}
