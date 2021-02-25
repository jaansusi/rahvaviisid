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
import {Tunes} from '../models';
import {TunesRepository} from '../repositories';

export class TunesController {
  constructor(
    @repository(TunesRepository)
    public tunesRepository : TunesRepository,
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
  async count(
    @param.where(Tunes) where?: Where<Tunes>,
  ): Promise<Count> {
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
  async find(
    @param.filter(Tunes) filter?: Filter<Tunes>,
  ): Promise<Tunes[]> {
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
    @param.filter(Tunes, {exclude: 'where'}) filter?: FilterExcludingWhere<Tunes>
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
          schema: getModelSchemaRef(Tunes, {partial: false}),
        },
      },
    })
    tunes: Tunes,
  ): Promise<void> {
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
