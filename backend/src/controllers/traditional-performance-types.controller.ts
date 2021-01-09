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
import {TraditionalPerformanceTypes} from '../models';
import {TraditionalPerformanceTypesRepository} from '../repositories';

export class TraditionalPerformanceTypesController {
  constructor(
    @repository(TraditionalPerformanceTypesRepository)
    public traditionalPerformanceTypesRepository : TraditionalPerformanceTypesRepository,
  ) {}

  @post('/traditional-performance-types', {
    responses: {
      '200': {
        description: 'TraditionalPerformanceTypes model instance',
        content: {'application/json': {schema: getModelSchemaRef(TraditionalPerformanceTypes)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TraditionalPerformanceTypes, {
            title: 'NewTraditionalPerformanceTypes',
            exclude: ['id'],
          }),
        },
      },
    })
    traditionalPerformanceTypes: Omit<TraditionalPerformanceTypes, 'id'>,
  ): Promise<TraditionalPerformanceTypes> {
    return this.traditionalPerformanceTypesRepository.create(traditionalPerformanceTypes);
  }

  @get('/traditional-performance-types/count', {
    responses: {
      '200': {
        description: 'TraditionalPerformanceTypes model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TraditionalPerformanceTypes) where?: Where<TraditionalPerformanceTypes>,
  ): Promise<Count> {
    return this.traditionalPerformanceTypesRepository.count(where);
  }

  @get('/traditional-performance-types', {
    responses: {
      '200': {
        description: 'Array of TraditionalPerformanceTypes model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TraditionalPerformanceTypes, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TraditionalPerformanceTypes) filter?: Filter<TraditionalPerformanceTypes>,
  ): Promise<TraditionalPerformanceTypes[]> {
    return this.traditionalPerformanceTypesRepository.find(filter);
  }

  @patch('/traditional-performance-types', {
    responses: {
      '200': {
        description: 'TraditionalPerformanceTypes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TraditionalPerformanceTypes, {partial: true}),
        },
      },
    })
    traditionalPerformanceTypes: TraditionalPerformanceTypes,
    @param.where(TraditionalPerformanceTypes) where?: Where<TraditionalPerformanceTypes>,
  ): Promise<Count> {
    return this.traditionalPerformanceTypesRepository.updateAll(traditionalPerformanceTypes, where);
  }

  @get('/traditional-performance-types/{id}', {
    responses: {
      '200': {
        description: 'TraditionalPerformanceTypes model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TraditionalPerformanceTypes, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TraditionalPerformanceTypes, {exclude: 'where'}) filter?: FilterExcludingWhere<TraditionalPerformanceTypes>
  ): Promise<TraditionalPerformanceTypes> {
    return this.traditionalPerformanceTypesRepository.findById(id, filter);
  }

  @patch('/traditional-performance-types/{id}', {
    responses: {
      '204': {
        description: 'TraditionalPerformanceTypes PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TraditionalPerformanceTypes, {partial: true}),
        },
      },
    })
    traditionalPerformanceTypes: TraditionalPerformanceTypes,
  ): Promise<void> {
    await this.traditionalPerformanceTypesRepository.updateById(id, traditionalPerformanceTypes);
  }

  @put('/traditional-performance-types/{id}', {
    responses: {
      '204': {
        description: 'TraditionalPerformanceTypes PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() traditionalPerformanceTypes: TraditionalPerformanceTypes,
  ): Promise<void> {
    await this.traditionalPerformanceTypesRepository.replaceById(id, traditionalPerformanceTypes);
  }

  @del('/traditional-performance-types/{id}', {
    responses: {
      '204': {
        description: 'TraditionalPerformanceTypes DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.traditionalPerformanceTypesRepository.deleteById(id);
  }
}
