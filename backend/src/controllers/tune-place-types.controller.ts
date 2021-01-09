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
import {TunePlaceTypes} from '../models';
import {TunePlaceTypesRepository} from '../repositories';

export class TunePlaceTypesController {
  constructor(
    @repository(TunePlaceTypesRepository)
    public tunePlaceTypesRepository : TunePlaceTypesRepository,
  ) {}

  @post('/tune-place-types', {
    responses: {
      '200': {
        description: 'TunePlaceTypes model instance',
        content: {'application/json': {schema: getModelSchemaRef(TunePlaceTypes)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TunePlaceTypes, {
            title: 'NewTunePlaceTypes',
            exclude: ['id'],
          }),
        },
      },
    })
    tunePlaceTypes: Omit<TunePlaceTypes, 'id'>,
  ): Promise<TunePlaceTypes> {
    return this.tunePlaceTypesRepository.create(tunePlaceTypes);
  }

  @get('/tune-place-types/count', {
    responses: {
      '200': {
        description: 'TunePlaceTypes model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TunePlaceTypes) where?: Where<TunePlaceTypes>,
  ): Promise<Count> {
    return this.tunePlaceTypesRepository.count(where);
  }

  @get('/tune-place-types', {
    responses: {
      '200': {
        description: 'Array of TunePlaceTypes model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TunePlaceTypes, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TunePlaceTypes) filter?: Filter<TunePlaceTypes>,
  ): Promise<TunePlaceTypes[]> {
    return this.tunePlaceTypesRepository.find(filter);
  }

  @patch('/tune-place-types', {
    responses: {
      '200': {
        description: 'TunePlaceTypes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TunePlaceTypes, {partial: true}),
        },
      },
    })
    tunePlaceTypes: TunePlaceTypes,
    @param.where(TunePlaceTypes) where?: Where<TunePlaceTypes>,
  ): Promise<Count> {
    return this.tunePlaceTypesRepository.updateAll(tunePlaceTypes, where);
  }

  @get('/tune-place-types/{id}', {
    responses: {
      '200': {
        description: 'TunePlaceTypes model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TunePlaceTypes, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TunePlaceTypes, {exclude: 'where'}) filter?: FilterExcludingWhere<TunePlaceTypes>
  ): Promise<TunePlaceTypes> {
    return this.tunePlaceTypesRepository.findById(id, filter);
  }

  @patch('/tune-place-types/{id}', {
    responses: {
      '204': {
        description: 'TunePlaceTypes PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TunePlaceTypes, {partial: true}),
        },
      },
    })
    tunePlaceTypes: TunePlaceTypes,
  ): Promise<void> {
    await this.tunePlaceTypesRepository.updateById(id, tunePlaceTypes);
  }

  @put('/tune-place-types/{id}', {
    responses: {
      '204': {
        description: 'TunePlaceTypes PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tunePlaceTypes: TunePlaceTypes,
  ): Promise<void> {
    await this.tunePlaceTypesRepository.replaceById(id, tunePlaceTypes);
  }

  @del('/tune-place-types/{id}', {
    responses: {
      '204': {
        description: 'TunePlaceTypes DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tunePlaceTypesRepository.deleteById(id);
  }
}
