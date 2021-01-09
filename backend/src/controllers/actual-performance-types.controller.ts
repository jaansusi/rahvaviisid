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
import {ActualPerformanceTypes} from '../models';
import {ActualPerformanceTypesRepository} from '../repositories';

export class ActualPerformanceTypesController {
  constructor(
    @repository(ActualPerformanceTypesRepository)
    public actualPerformanceTypesRepository : ActualPerformanceTypesRepository,
  ) {}

  @post('/actual-performance-types', {
    responses: {
      '200': {
        description: 'ActualPerformanceTypes model instance',
        content: {'application/json': {schema: getModelSchemaRef(ActualPerformanceTypes)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ActualPerformanceTypes, {
            title: 'NewActualPerformanceTypes',
            exclude: ['id'],
          }),
        },
      },
    })
    actualPerformanceTypes: Omit<ActualPerformanceTypes, 'id'>,
  ): Promise<ActualPerformanceTypes> {
    return this.actualPerformanceTypesRepository.create(actualPerformanceTypes);
  }

  @get('/actual-performance-types/count', {
    responses: {
      '200': {
        description: 'ActualPerformanceTypes model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(ActualPerformanceTypes) where?: Where<ActualPerformanceTypes>,
  ): Promise<Count> {
    return this.actualPerformanceTypesRepository.count(where);
  }

  @get('/actual-performance-types', {
    responses: {
      '200': {
        description: 'Array of ActualPerformanceTypes model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ActualPerformanceTypes, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ActualPerformanceTypes) filter?: Filter<ActualPerformanceTypes>,
  ): Promise<ActualPerformanceTypes[]> {
    return this.actualPerformanceTypesRepository.find(filter);
  }

  @patch('/actual-performance-types', {
    responses: {
      '200': {
        description: 'ActualPerformanceTypes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ActualPerformanceTypes, {partial: true}),
        },
      },
    })
    actualPerformanceTypes: ActualPerformanceTypes,
    @param.where(ActualPerformanceTypes) where?: Where<ActualPerformanceTypes>,
  ): Promise<Count> {
    return this.actualPerformanceTypesRepository.updateAll(actualPerformanceTypes, where);
  }

  @get('/actual-performance-types/{id}', {
    responses: {
      '200': {
        description: 'ActualPerformanceTypes model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ActualPerformanceTypes, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ActualPerformanceTypes, {exclude: 'where'}) filter?: FilterExcludingWhere<ActualPerformanceTypes>
  ): Promise<ActualPerformanceTypes> {
    return this.actualPerformanceTypesRepository.findById(id, filter);
  }

  @patch('/actual-performance-types/{id}', {
    responses: {
      '204': {
        description: 'ActualPerformanceTypes PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ActualPerformanceTypes, {partial: true}),
        },
      },
    })
    actualPerformanceTypes: ActualPerformanceTypes,
  ): Promise<void> {
    await this.actualPerformanceTypesRepository.updateById(id, actualPerformanceTypes);
  }

  @put('/actual-performance-types/{id}', {
    responses: {
      '204': {
        description: 'ActualPerformanceTypes PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() actualPerformanceTypes: ActualPerformanceTypes,
  ): Promise<void> {
    await this.actualPerformanceTypesRepository.replaceById(id, actualPerformanceTypes);
  }

  @del('/actual-performance-types/{id}', {
    responses: {
      '204': {
        description: 'ActualPerformanceTypes DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.actualPerformanceTypesRepository.deleteById(id);
  }
}
