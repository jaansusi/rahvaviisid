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
import {TuneForms} from '../../models';
import {TuneFormsRepository} from '../../repositories';

export class TuneFormsController {
  constructor(
    @repository(TuneFormsRepository)
    public tuneFormsRepository : TuneFormsRepository,
  ) {}

  @post('/tune-forms', {
    responses: {
      '200': {
        description: 'TuneForms model instance',
        content: {'application/json': {schema: getModelSchemaRef(TuneForms)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TuneForms, {
            title: 'NewTuneForms',
            exclude: ['id'],
          }),
        },
      },
    })
    tuneForms: Omit<TuneForms, 'id'>,
  ): Promise<TuneForms> {
    return this.tuneFormsRepository.create(tuneForms);
  }

  @get('/tune-forms/count', {
    responses: {
      '200': {
        description: 'TuneForms model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TuneForms) where?: Where<TuneForms>,
  ): Promise<Count> {
    return this.tuneFormsRepository.count(where);
  }

  @get('/tune-forms', {
    responses: {
      '200': {
        description: 'Array of TuneForms model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TuneForms, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TuneForms) filter?: Filter<TuneForms>,
  ): Promise<TuneForms[]> {
    return this.tuneFormsRepository.find(filter);
  }

  @patch('/tune-forms', {
    responses: {
      '200': {
        description: 'TuneForms PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TuneForms, {partial: true}),
        },
      },
    })
    tuneForms: TuneForms,
    @param.where(TuneForms) where?: Where<TuneForms>,
  ): Promise<Count> {
    return this.tuneFormsRepository.updateAll(tuneForms, where);
  }

  @get('/tune-forms/{id}', {
    responses: {
      '200': {
        description: 'TuneForms model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TuneForms, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TuneForms, {exclude: 'where'}) filter?: FilterExcludingWhere<TuneForms>
  ): Promise<TuneForms> {
    return this.tuneFormsRepository.findById(id, filter);
  }

  @patch('/tune-forms/{id}', {
    responses: {
      '204': {
        description: 'TuneForms PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TuneForms, {partial: true}),
        },
      },
    })
    tuneForms: TuneForms,
  ): Promise<void> {
    await this.tuneFormsRepository.updateById(id, tuneForms);
  }

  @put('/tune-forms/{id}', {
    responses: {
      '204': {
        description: 'TuneForms PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tuneForms: TuneForms,
  ): Promise<void> {
    await this.tuneFormsRepository.replaceById(id, tuneForms);
  }

  @del('/tune-forms/{id}', {
    responses: {
      '204': {
        description: 'TuneForms DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tuneFormsRepository.deleteById(id);
  }
}
