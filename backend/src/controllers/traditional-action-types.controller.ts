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
import {TraditionalActionTypes} from '../models';
import {TraditionalActionTypesRepository} from '../repositories';

export class TraditionalActionTypesController {
  constructor(
    @repository(TraditionalActionTypesRepository)
    public traditionalActionTypesRepository : TraditionalActionTypesRepository,
  ) {}

  @post('/traditional-action-types', {
    responses: {
      '200': {
        description: 'TraditionalActionTypes model instance',
        content: {'application/json': {schema: getModelSchemaRef(TraditionalActionTypes)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TraditionalActionTypes, {
            title: 'NewTraditionalActionTypes',
            exclude: ['id'],
          }),
        },
      },
    })
    traditionalActionTypes: Omit<TraditionalActionTypes, 'id'>,
  ): Promise<TraditionalActionTypes> {
    return this.traditionalActionTypesRepository.create(traditionalActionTypes);
  }

  @get('/traditional-action-types/count', {
    responses: {
      '200': {
        description: 'TraditionalActionTypes model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TraditionalActionTypes) where?: Where<TraditionalActionTypes>,
  ): Promise<Count> {
    return this.traditionalActionTypesRepository.count(where);
  }

  @get('/traditional-action-types', {
    responses: {
      '200': {
        description: 'Array of TraditionalActionTypes model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TraditionalActionTypes, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TraditionalActionTypes) filter?: Filter<TraditionalActionTypes>,
  ): Promise<TraditionalActionTypes[]> {
    return this.traditionalActionTypesRepository.find(filter);
  }

  @patch('/traditional-action-types', {
    responses: {
      '200': {
        description: 'TraditionalActionTypes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TraditionalActionTypes, {partial: true}),
        },
      },
    })
    traditionalActionTypes: TraditionalActionTypes,
    @param.where(TraditionalActionTypes) where?: Where<TraditionalActionTypes>,
  ): Promise<Count> {
    return this.traditionalActionTypesRepository.updateAll(traditionalActionTypes, where);
  }

  @get('/traditional-action-types/{id}', {
    responses: {
      '200': {
        description: 'TraditionalActionTypes model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TraditionalActionTypes, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TraditionalActionTypes, {exclude: 'where'}) filter?: FilterExcludingWhere<TraditionalActionTypes>
  ): Promise<TraditionalActionTypes> {
    return this.traditionalActionTypesRepository.findById(id, filter);
  }

  @patch('/traditional-action-types/{id}', {
    responses: {
      '204': {
        description: 'TraditionalActionTypes PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TraditionalActionTypes, {partial: true}),
        },
      },
    })
    traditionalActionTypes: TraditionalActionTypes,
  ): Promise<void> {
    await this.traditionalActionTypesRepository.updateById(id, traditionalActionTypes);
  }

  @put('/traditional-action-types/{id}', {
    responses: {
      '204': {
        description: 'TraditionalActionTypes PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() traditionalActionTypes: TraditionalActionTypes,
  ): Promise<void> {
    await this.traditionalActionTypesRepository.replaceById(id, traditionalActionTypes);
  }

  @del('/traditional-action-types/{id}', {
    responses: {
      '204': {
        description: 'TraditionalActionTypes DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.traditionalActionTypesRepository.deleteById(id);
  }
}
