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
import {RhythmTypes} from '../../models';
import {RhythmTypesRepository} from '../../repositories';

export class RhythmTypesController {
  constructor(
    @repository(RhythmTypesRepository)
    public rhythmTypesRepository : RhythmTypesRepository,
  ) {}

  @post('/rhythm-types', {
    responses: {
      '200': {
        description: 'RhythmTypes model instance',
        content: {'application/json': {schema: getModelSchemaRef(RhythmTypes)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RhythmTypes, {
            title: 'NewRhythmTypes',
            exclude: ['id'],
          }),
        },
      },
    })
    rhythmTypes: Omit<RhythmTypes, 'id'>,
  ): Promise<RhythmTypes> {
    return this.rhythmTypesRepository.create(rhythmTypes);
  }

  @get('/rhythm-types/count', {
    responses: {
      '200': {
        description: 'RhythmTypes model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(RhythmTypes) where?: Where<RhythmTypes>,
  ): Promise<Count> {
    return this.rhythmTypesRepository.count(where);
  }

  @get('/rhythm-types', {
    responses: {
      '200': {
        description: 'Array of RhythmTypes model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(RhythmTypes, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(RhythmTypes) filter?: Filter<RhythmTypes>,
  ): Promise<RhythmTypes[]> {
    return this.rhythmTypesRepository.find(filter);
  }

  @patch('/rhythm-types', {
    responses: {
      '200': {
        description: 'RhythmTypes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RhythmTypes, {partial: true}),
        },
      },
    })
    rhythmTypes: RhythmTypes,
    @param.where(RhythmTypes) where?: Where<RhythmTypes>,
  ): Promise<Count> {
    return this.rhythmTypesRepository.updateAll(rhythmTypes, where);
  }

  @get('/rhythm-types/{id}', {
    responses: {
      '200': {
        description: 'RhythmTypes model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(RhythmTypes, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(RhythmTypes, {exclude: 'where'}) filter?: FilterExcludingWhere<RhythmTypes>
  ): Promise<RhythmTypes> {
    return this.rhythmTypesRepository.findById(id, filter);
  }

  @patch('/rhythm-types/{id}', {
    responses: {
      '204': {
        description: 'RhythmTypes PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RhythmTypes, {partial: true}),
        },
      },
    })
    rhythmTypes: RhythmTypes,
  ): Promise<void> {
    await this.rhythmTypesRepository.updateById(id, rhythmTypes);
  }

  @put('/rhythm-types/{id}', {
    responses: {
      '204': {
        description: 'RhythmTypes PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() rhythmTypes: RhythmTypes,
  ): Promise<void> {
    await this.rhythmTypesRepository.replaceById(id, rhythmTypes);
  }

  @del('/rhythm-types/{id}', {
    responses: {
      '204': {
        description: 'RhythmTypes DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.rhythmTypesRepository.deleteById(id);
  }
}
