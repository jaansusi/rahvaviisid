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
import {SoundRanges} from '../models';
import {SoundRangesRepository} from '../repositories';

export class SoundRangesController {
  constructor(
    @repository(SoundRangesRepository)
    public soundRangesRepository : SoundRangesRepository,
  ) {}

  @post('/sound-ranges', {
    responses: {
      '200': {
        description: 'SoundRanges model instance',
        content: {'application/json': {schema: getModelSchemaRef(SoundRanges)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SoundRanges, {
            title: 'NewSoundRanges',
            exclude: ['id'],
          }),
        },
      },
    })
    soundRanges: Omit<SoundRanges, 'id'>,
  ): Promise<SoundRanges> {
    return this.soundRangesRepository.create(soundRanges);
  }

  @get('/sound-ranges/count', {
    responses: {
      '200': {
        description: 'SoundRanges model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(SoundRanges) where?: Where<SoundRanges>,
  ): Promise<Count> {
    return this.soundRangesRepository.count(where);
  }

  @get('/sound-ranges', {
    responses: {
      '200': {
        description: 'Array of SoundRanges model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(SoundRanges, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(SoundRanges) filter?: Filter<SoundRanges>,
  ): Promise<SoundRanges[]> {
    return this.soundRangesRepository.find(filter);
  }

  @patch('/sound-ranges', {
    responses: {
      '200': {
        description: 'SoundRanges PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SoundRanges, {partial: true}),
        },
      },
    })
    soundRanges: SoundRanges,
    @param.where(SoundRanges) where?: Where<SoundRanges>,
  ): Promise<Count> {
    return this.soundRangesRepository.updateAll(soundRanges, where);
  }

  @get('/sound-ranges/{id}', {
    responses: {
      '200': {
        description: 'SoundRanges model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SoundRanges, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SoundRanges, {exclude: 'where'}) filter?: FilterExcludingWhere<SoundRanges>
  ): Promise<SoundRanges> {
    return this.soundRangesRepository.findById(id, filter);
  }

  @patch('/sound-ranges/{id}', {
    responses: {
      '204': {
        description: 'SoundRanges PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SoundRanges, {partial: true}),
        },
      },
    })
    soundRanges: SoundRanges,
  ): Promise<void> {
    await this.soundRangesRepository.updateById(id, soundRanges);
  }

  @put('/sound-ranges/{id}', {
    responses: {
      '204': {
        description: 'SoundRanges PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() soundRanges: SoundRanges,
  ): Promise<void> {
    await this.soundRangesRepository.replaceById(id, soundRanges);
  }

  @del('/sound-ranges/{id}', {
    responses: {
      '204': {
        description: 'SoundRanges DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.soundRangesRepository.deleteById(id);
  }
}
