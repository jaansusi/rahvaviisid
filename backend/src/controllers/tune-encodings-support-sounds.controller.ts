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
  TuneEncodings,
  SupportSounds,
} from '../models';
import {TuneEncodingsRepository} from '../repositories';

export class TuneEncodingsSupportSoundsController {
  constructor(
    @repository(TuneEncodingsRepository) protected tuneEncodingsRepository: TuneEncodingsRepository,
  ) { }

  @get('/tune-encodings/{id}/support-sounds', {
    responses: {
      '200': {
        description: 'TuneEncodings has one SupportSounds',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SupportSounds),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<SupportSounds>,
  ): Promise<SupportSounds> {
    return this.tuneEncodingsRepository.supportSounds(id).get(filter);
  }

  @post('/tune-encodings/{id}/support-sounds', {
    responses: {
      '200': {
        description: 'TuneEncodings model instance',
        content: {'application/json': {schema: getModelSchemaRef(SupportSounds)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TuneEncodings.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SupportSounds, {
            title: 'NewSupportSoundsInTuneEncodings',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) supportSounds: Omit<SupportSounds, 'id'>,
  ): Promise<SupportSounds> {
    return this.tuneEncodingsRepository.supportSounds(id).create(supportSounds);
  }

  @patch('/tune-encodings/{id}/support-sounds', {
    responses: {
      '200': {
        description: 'TuneEncodings.SupportSounds PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SupportSounds, {partial: true}),
        },
      },
    })
    supportSounds: Partial<SupportSounds>,
    @param.query.object('where', getWhereSchemaFor(SupportSounds)) where?: Where<SupportSounds>,
  ): Promise<Count> {
    return this.tuneEncodingsRepository.supportSounds(id).patch(supportSounds, where);
  }

  @del('/tune-encodings/{id}/support-sounds', {
    responses: {
      '200': {
        description: 'TuneEncodings.SupportSounds DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SupportSounds)) where?: Where<SupportSounds>,
  ): Promise<Count> {
    return this.tuneEncodingsRepository.supportSounds(id).delete(where);
  }
}
