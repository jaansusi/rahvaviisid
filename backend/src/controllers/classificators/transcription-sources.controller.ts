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
import {TranscriptionSources} from '../../models';
import {TranscriptionSourcesRepository} from '../../repositories';

export class TranscriptionSourcesController {
  constructor(
    @repository(TranscriptionSourcesRepository)
    public transcriptionSourcesRepository : TranscriptionSourcesRepository,
  ) {}

  @post('/transcription-sources', {
    responses: {
      '200': {
        description: 'TranscriptionSources model instance',
        content: {'application/json': {schema: getModelSchemaRef(TranscriptionSources)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TranscriptionSources, {
            title: 'NewTranscriptionSources',
            exclude: ['id'],
          }),
        },
      },
    })
    transcriptionSources: Omit<TranscriptionSources, 'id'>,
  ): Promise<TranscriptionSources> {
    return this.transcriptionSourcesRepository.create(transcriptionSources);
  }

  @get('/transcription-sources/count', {
    responses: {
      '200': {
        description: 'TranscriptionSources model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TranscriptionSources) where?: Where<TranscriptionSources>,
  ): Promise<Count> {
    return this.transcriptionSourcesRepository.count(where);
  }

  @get('/transcription-sources', {
    responses: {
      '200': {
        description: 'Array of TranscriptionSources model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TranscriptionSources, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TranscriptionSources) filter?: Filter<TranscriptionSources>,
  ): Promise<TranscriptionSources[]> {
    return this.transcriptionSourcesRepository.find(filter);
  }

  @patch('/transcription-sources', {
    responses: {
      '200': {
        description: 'TranscriptionSources PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TranscriptionSources, {partial: true}),
        },
      },
    })
    transcriptionSources: TranscriptionSources,
    @param.where(TranscriptionSources) where?: Where<TranscriptionSources>,
  ): Promise<Count> {
    return this.transcriptionSourcesRepository.updateAll(transcriptionSources, where);
  }

  @get('/transcription-sources/{id}', {
    responses: {
      '200': {
        description: 'TranscriptionSources model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TranscriptionSources, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TranscriptionSources, {exclude: 'where'}) filter?: FilterExcludingWhere<TranscriptionSources>
  ): Promise<TranscriptionSources> {
    return this.transcriptionSourcesRepository.findById(id, filter);
  }

  @patch('/transcription-sources/{id}', {
    responses: {
      '204': {
        description: 'TranscriptionSources PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TranscriptionSources, {partial: true}),
        },
      },
    })
    transcriptionSources: TranscriptionSources,
  ): Promise<void> {
    await this.transcriptionSourcesRepository.updateById(id, transcriptionSources);
  }

  @put('/transcription-sources/{id}', {
    responses: {
      '204': {
        description: 'TranscriptionSources PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() transcriptionSources: TranscriptionSources,
  ): Promise<void> {
    await this.transcriptionSourcesRepository.replaceById(id, transcriptionSources);
  }

  @del('/transcription-sources/{id}', {
    responses: {
      '204': {
        description: 'TranscriptionSources DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.transcriptionSourcesRepository.deleteById(id);
  }
}
