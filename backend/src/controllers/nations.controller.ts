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
import {Nations} from '../models';
import {NationsRepository} from '../repositories';

export class NationsController {
  constructor(
    @repository(NationsRepository)
    public nationsRepository : NationsRepository,
  ) {}

  @post('/nations', {
    responses: {
      '200': {
        description: 'Nations model instance',
        content: {'application/json': {schema: getModelSchemaRef(Nations)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Nations, {
            title: 'NewNations',
            exclude: ['id'],
          }),
        },
      },
    })
    nations: Omit<Nations, 'id'>,
  ): Promise<Nations> {
    return this.nationsRepository.create(nations);
  }

  @get('/nations/count', {
    responses: {
      '200': {
        description: 'Nations model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Nations) where?: Where<Nations>,
  ): Promise<Count> {
    return this.nationsRepository.count(where);
  }

  @get('/nations', {
    responses: {
      '200': {
        description: 'Array of Nations model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Nations, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Nations) filter?: Filter<Nations>,
  ): Promise<Nations[]> {
    return this.nationsRepository.find(filter);
  }

  @patch('/nations', {
    responses: {
      '200': {
        description: 'Nations PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Nations, {partial: true}),
        },
      },
    })
    nations: Nations,
    @param.where(Nations) where?: Where<Nations>,
  ): Promise<Count> {
    return this.nationsRepository.updateAll(nations, where);
  }

  @get('/nations/{id}', {
    responses: {
      '200': {
        description: 'Nations model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Nations, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Nations, {exclude: 'where'}) filter?: FilterExcludingWhere<Nations>
  ): Promise<Nations> {
    return this.nationsRepository.findById(id, filter);
  }

  @patch('/nations/{id}', {
    responses: {
      '204': {
        description: 'Nations PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Nations, {partial: true}),
        },
      },
    })
    nations: Nations,
  ): Promise<void> {
    await this.nationsRepository.updateById(id, nations);
  }

  @put('/nations/{id}', {
    responses: {
      '204': {
        description: 'Nations PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() nations: Nations,
  ): Promise<void> {
    await this.nationsRepository.replaceById(id, nations);
  }

  @del('/nations/{id}', {
    responses: {
      '204': {
        description: 'Nations DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.nationsRepository.deleteById(id);
  }
}
