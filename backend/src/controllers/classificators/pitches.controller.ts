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
import {Pitches} from '../../models';
import {PitchesRepository} from '../../repositories';

export class PitchesController {
  constructor(
    @repository(PitchesRepository)
    public pitchesRepository : PitchesRepository,
  ) {}

  @post('/pitches', {
    responses: {
      '200': {
        description: 'Pitches model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pitches)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pitches, {
            title: 'NewPitches',
            exclude: ['id'],
          }),
        },
      },
    })
    pitches: Omit<Pitches, 'id'>,
  ): Promise<Pitches> {
    return this.pitchesRepository.create(pitches);
  }

  @get('/pitches/count', {
    responses: {
      '200': {
        description: 'Pitches model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Pitches) where?: Where<Pitches>,
  ): Promise<Count> {
    return this.pitchesRepository.count(where);
  }

  @get('/pitches', {
    responses: {
      '200': {
        description: 'Array of Pitches model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Pitches, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Pitches) filter?: Filter<Pitches>,
  ): Promise<Pitches[]> {
    return this.pitchesRepository.find(filter);
  }

  @patch('/pitches', {
    responses: {
      '200': {
        description: 'Pitches PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pitches, {partial: true}),
        },
      },
    })
    pitches: Pitches,
    @param.where(Pitches) where?: Where<Pitches>,
  ): Promise<Count> {
    return this.pitchesRepository.updateAll(pitches, where);
  }

  @get('/pitches/{id}', {
    responses: {
      '200': {
        description: 'Pitches model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Pitches, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Pitches, {exclude: 'where'}) filter?: FilterExcludingWhere<Pitches>
  ): Promise<Pitches> {
    return this.pitchesRepository.findById(id, filter);
  }

  @patch('/pitches/{id}', {
    responses: {
      '204': {
        description: 'Pitches PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pitches, {partial: true}),
        },
      },
    })
    pitches: Pitches,
  ): Promise<void> {
    await this.pitchesRepository.updateById(id, pitches);
  }

  @put('/pitches/{id}', {
    responses: {
      '204': {
        description: 'Pitches PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() pitches: Pitches,
  ): Promise<void> {
    await this.pitchesRepository.replaceById(id, pitches);
  }

  @del('/pitches/{id}', {
    responses: {
      '204': {
        description: 'Pitches DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pitchesRepository.deleteById(id);
  }
}
