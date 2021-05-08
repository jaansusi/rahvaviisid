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
import {Sexes} from '../../models';
import {SexesRepository} from '../../repositories';

export class SexesController {
  constructor(
    @repository(SexesRepository)
    public sexesRepository : SexesRepository,
  ) {}

  @post('/sexes', {
    responses: {
      '200': {
        description: 'Sexes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Sexes)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sexes, {
            title: 'NewSexes',
            exclude: ['id'],
          }),
        },
      },
    })
    sexes: Omit<Sexes, 'id'>,
  ): Promise<Sexes> {
    return this.sexesRepository.create(sexes);
  }

  @get('/sexes/count', {
    responses: {
      '200': {
        description: 'Sexes model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Sexes) where?: Where<Sexes>,
  ): Promise<Count> {
    return this.sexesRepository.count(where);
  }

  @get('/sexes', {
    responses: {
      '200': {
        description: 'Array of Sexes model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Sexes, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Sexes) filter?: Filter<Sexes>,
  ): Promise<Sexes[]> {
    return this.sexesRepository.find(filter);
  }

  @patch('/sexes', {
    responses: {
      '200': {
        description: 'Sexes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sexes, {partial: true}),
        },
      },
    })
    sexes: Sexes,
    @param.where(Sexes) where?: Where<Sexes>,
  ): Promise<Count> {
    return this.sexesRepository.updateAll(sexes, where);
  }

  @get('/sexes/{id}', {
    responses: {
      '200': {
        description: 'Sexes model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Sexes, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Sexes, {exclude: 'where'}) filter?: FilterExcludingWhere<Sexes>
  ): Promise<Sexes> {
    return this.sexesRepository.findById(id, filter);
  }

  @patch('/sexes/{id}', {
    responses: {
      '204': {
        description: 'Sexes PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sexes, {partial: true}),
        },
      },
    })
    sexes: Sexes,
  ): Promise<void> {
    await this.sexesRepository.updateById(id, sexes);
  }

  @put('/sexes/{id}', {
    responses: {
      '204': {
        description: 'Sexes PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() sexes: Sexes,
  ): Promise<void> {
    await this.sexesRepository.replaceById(id, sexes);
  }

  @del('/sexes/{id}', {
    responses: {
      '204': {
        description: 'Sexes DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.sexesRepository.deleteById(id);
  }
}
