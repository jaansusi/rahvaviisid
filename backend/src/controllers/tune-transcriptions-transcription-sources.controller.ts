import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  TuneTranscriptions,
  TranscriptionSources,
} from '../models';
import {TuneTranscriptionsRepository} from '../repositories';

export class TuneTranscriptionsTranscriptionSourcesController {
  constructor(
    @repository(TuneTranscriptionsRepository) protected tuneTranscriptionsRepository: TuneTranscriptionsRepository,
  ) { }

  @get('/tune-transcriptions/{id}/transcription-sources', {
    responses: {
      '200': {
        description: 'TuneTranscriptions has one TranscriptionSources',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TranscriptionSources),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TranscriptionSources>,
  ): Promise<TranscriptionSources> {
    return this.tuneTranscriptionsRepository.transcriptionSources(id).get(filter);
  }

  @post('/tune-transcriptions/{id}/transcription-sources', {
    responses: {
      '200': {
        description: 'TuneTranscriptions model instance',
        content: {'application/json': {schema: getModelSchemaRef(TranscriptionSources)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TuneTranscriptions.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TranscriptionSources, {
            title: 'NewTranscriptionSourcesInTuneTranscriptions',
            exclude: ['id'],
            optional: ['transcriptionSourceId']
          }),
        },
      },
    }) transcriptionSources: Omit<TranscriptionSources, 'id'>,
  ): Promise<TranscriptionSources> {
    return this.tuneTranscriptionsRepository.transcriptionSources(id).create(transcriptionSources);
  }

  @patch('/tune-transcriptions/{id}/transcription-sources', {
    responses: {
      '200': {
        description: 'TuneTranscriptions.TranscriptionSources PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TranscriptionSources, {partial: true}),
        },
      },
    })
    transcriptionSources: Partial<TranscriptionSources>,
    @param.query.object('where', getWhereSchemaFor(TranscriptionSources)) where?: Where<TranscriptionSources>,
  ): Promise<Count> {
    return this.tuneTranscriptionsRepository.transcriptionSources(id).patch(transcriptionSources, where);
  }

  @del('/tune-transcriptions/{id}/transcription-sources', {
    responses: {
      '200': {
        description: 'TuneTranscriptions.TranscriptionSources DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TranscriptionSources)) where?: Where<TranscriptionSources>,
  ): Promise<Count> {
    return this.tuneTranscriptionsRepository.transcriptionSources(id).delete(where);
  }
}
