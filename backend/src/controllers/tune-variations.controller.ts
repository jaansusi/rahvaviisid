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
import {TuneVariations} from '../models';
import {TuneVariationsRepository} from '../repositories';

export class TuneVariationsController {
  constructor(
    @repository(TuneVariationsRepository)
    public tuneVariationsRepository : TuneVariationsRepository,
  ) {}

  @post('/tune-variations', {
    responses: {
      '200': {
        description: 'TuneVariations model instance',
        content: {'application/json': {schema: getModelSchemaRef(TuneVariations)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TuneVariations, {
            title: 'NewTuneVariations',
            exclude: ['id'],
          }),
        },
      },
    })
    tuneVariations: Omit<TuneVariations, 'id'>,
  ): Promise<TuneVariations> {
    return this.tuneVariationsRepository.create(tuneVariations);
  }

  @get('/tune-variations/count', {
    responses: {
      '200': {
        description: 'TuneVariations model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TuneVariations) where?: Where<TuneVariations>,
  ): Promise<Count> {
    return this.tuneVariationsRepository.count(where);
  }

  @get('/tune-variations', {
    responses: {
      '200': {
        description: 'Array of TuneVariations model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TuneVariations, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TuneVariations) filter?: Filter<TuneVariations>,
  ): Promise<TuneVariations[]> {
    return this.tuneVariationsRepository.find(filter);
  }

  @patch('/tune-variations', {
    responses: {
      '200': {
        description: 'TuneVariations PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TuneVariations, {partial: true}),
        },
      },
    })
    tuneVariations: TuneVariations,
    @param.where(TuneVariations) where?: Where<TuneVariations>,
  ): Promise<Count> {
    return this.tuneVariationsRepository.updateAll(tuneVariations, where);
  }

  @get('/tune-variations/{id}', {
    responses: {
      '200': {
        description: 'TuneVariations model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TuneVariations, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TuneVariations, {exclude: 'where'}) filter?: FilterExcludingWhere<TuneVariations>
  ): Promise<TuneVariations> {
    return this.tuneVariationsRepository.findById(id, filter);
  }

  @patch('/tune-variations/{id}', {
    responses: {
      '204': {
        description: 'TuneVariations PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TuneVariations, {partial: true}),
        },
      },
    })
    tuneVariations: TuneVariations,
  ): Promise<void> {
    await this.tuneVariationsRepository.updateById(id, tuneVariations);
  }

  @put('/tune-variations/{id}', {
    responses: {
      '204': {
        description: 'TuneVariations PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tuneVariations: TuneVariations,
  ): Promise<void> {
    await this.tuneVariationsRepository.replaceById(id, tuneVariations);
  }

  @del('/tune-variations/{id}', {
    responses: {
      '204': {
        description: 'TuneVariations DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tuneVariationsRepository.deleteById(id);
  }
}
