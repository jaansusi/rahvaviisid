import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
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
import {TuneGenres} from '../../models';
import {TuneGenresRepository} from '../../repositories';

export class TuneGenresController {
  constructor(
    @repository(TuneGenresRepository)
    public tuneGenresRepository : TuneGenresRepository,
  ) {}

  @post('/tune-genres', {
    responses: {
      '200': {
        description: 'TuneGenres model instance',
        content: {'application/json': {schema: getModelSchemaRef(TuneGenres)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TuneGenres, {
            title: 'NewTuneGenres',
            exclude: ['id'],
          }),
        },
      },
    })
    tuneGenres: Omit<TuneGenres, 'id'>,
  ): Promise<TuneGenres> {
    return this.tuneGenresRepository.create(tuneGenres);
  }

  @get('/tune-genres/count', {
    responses: {
      '200': {
        description: 'TuneGenres model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TuneGenres) where?: Where<TuneGenres>,
  ): Promise<Count> {
    return this.tuneGenresRepository.count(where);
  }

  @get('/tune-genres', {
    responses: {
      '200': {
        description: 'Array of TuneGenres model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TuneGenres, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TuneGenres) filter?: Filter<TuneGenres>,
  ): Promise<TuneGenres[]> {
    return this.tuneGenresRepository.find(filter);
  }

  @patch('/tune-genres', {
    responses: {
      '200': {
        description: 'TuneGenres PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TuneGenres, {partial: true}),
        },
      },
    })
    tuneGenres: TuneGenres,
    @param.where(TuneGenres) where?: Where<TuneGenres>,
  ): Promise<Count> {
    return this.tuneGenresRepository.updateAll(tuneGenres, where);
  }

  @get('/tune-genres/{id}', {
    responses: {
      '200': {
        description: 'TuneGenres model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TuneGenres, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TuneGenres, {exclude: 'where'}) filter?: FilterExcludingWhere<TuneGenres>
  ): Promise<TuneGenres> {
    return this.tuneGenresRepository.findById(id, filter);
  }

  @patch('/tune-genres/{id}', {
    responses: {
      '204': {
        description: 'TuneGenres PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TuneGenres, {partial: true}),
        },
      },
    })
    tuneGenres: TuneGenres,
  ): Promise<void> {
    await this.tuneGenresRepository.updateById(id, tuneGenres);
  }

  @put('/tune-genres/{id}', {
    responses: {
      '204': {
        description: 'TuneGenres PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tuneGenres: TuneGenres,
  ): Promise<void> {
    await this.tuneGenresRepository.replaceById(id, tuneGenres);
  }

  @del('/tune-genres/{id}', {
    responses: {
      '204': {
        description: 'TuneGenres DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tuneGenresRepository.deleteById(id);
  }
}
