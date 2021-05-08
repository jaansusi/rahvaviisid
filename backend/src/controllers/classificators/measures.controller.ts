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
import {Measures} from '../../models';
import {MeasuresRepository} from '../../repositories';

export class MeasuresController {
  constructor(
    @repository(MeasuresRepository)
    public measuresRepository : MeasuresRepository,
  ) {}

  @post('/measures', {
    responses: {
      '200': {
        description: 'Measures model instance',
        content: {'application/json': {schema: getModelSchemaRef(Measures)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Measures, {
            title: 'NewMeasures',
            exclude: ['id'],
          }),
        },
      },
    })
    measures: Omit<Measures, 'id'>,
  ): Promise<Measures> {
    return this.measuresRepository.create(measures);
  }

  @get('/measures/count', {
    responses: {
      '200': {
        description: 'Measures model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Measures) where?: Where<Measures>,
  ): Promise<Count> {
    return this.measuresRepository.count(where);
  }

  @get('/measures', {
    responses: {
      '200': {
        description: 'Array of Measures model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Measures, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Measures) filter?: Filter<Measures>,
  ): Promise<Measures[]> {
    return this.measuresRepository.find(filter);
  }

  @patch('/measures', {
    responses: {
      '200': {
        description: 'Measures PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Measures, {partial: true}),
        },
      },
    })
    measures: Measures,
    @param.where(Measures) where?: Where<Measures>,
  ): Promise<Count> {
    return this.measuresRepository.updateAll(measures, where);
  }

  @get('/measures/{id}', {
    responses: {
      '200': {
        description: 'Measures model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Measures, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Measures, {exclude: 'where'}) filter?: FilterExcludingWhere<Measures>
  ): Promise<Measures> {
    return this.measuresRepository.findById(id, filter);
  }

  @patch('/measures/{id}', {
    responses: {
      '204': {
        description: 'Measures PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Measures, {partial: true}),
        },
      },
    })
    measures: Measures,
  ): Promise<void> {
    await this.measuresRepository.updateById(id, measures);
  }

  @put('/measures/{id}', {
    responses: {
      '204': {
        description: 'Measures PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() measures: Measures,
  ): Promise<void> {
    await this.measuresRepository.replaceById(id, measures);
  }

  @del('/measures/{id}', {
    responses: {
      '204': {
        description: 'Measures DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.measuresRepository.deleteById(id);
  }
}
