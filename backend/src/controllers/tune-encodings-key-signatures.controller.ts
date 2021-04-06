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
  KeySignatures,
} from '../models';
import {TuneEncodingsRepository} from '../repositories';

export class TuneEncodingsKeySignaturesController {
  constructor(
    @repository(TuneEncodingsRepository) protected tuneEncodingsRepository: TuneEncodingsRepository,
  ) { }

  @get('/tune-encodings/{id}/key-signatures', {
    responses: {
      '200': {
        description: 'TuneEncodings has one KeySignatures',
        content: {
          'application/json': {
            schema: getModelSchemaRef(KeySignatures),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<KeySignatures>,
  ): Promise<KeySignatures> {
    return this.tuneEncodingsRepository.keySignatures(id).get(filter);
  }

  @post('/tune-encodings/{id}/key-signatures', {
    responses: {
      '200': {
        description: 'TuneEncodings model instance',
        content: {'application/json': {schema: getModelSchemaRef(KeySignatures)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TuneEncodings.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(KeySignatures, {
            title: 'NewKeySignaturesInTuneEncodings',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) keySignatures: Omit<KeySignatures, 'id'>,
  ): Promise<KeySignatures> {
    return this.tuneEncodingsRepository.keySignatures(id).create(keySignatures);
  }

  @patch('/tune-encodings/{id}/key-signatures', {
    responses: {
      '200': {
        description: 'TuneEncodings.KeySignatures PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(KeySignatures, {partial: true}),
        },
      },
    })
    keySignatures: Partial<KeySignatures>,
    @param.query.object('where', getWhereSchemaFor(KeySignatures)) where?: Where<KeySignatures>,
  ): Promise<Count> {
    return this.tuneEncodingsRepository.keySignatures(id).patch(keySignatures, where);
  }

  @del('/tune-encodings/{id}/key-signatures', {
    responses: {
      '200': {
        description: 'TuneEncodings.KeySignatures DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(KeySignatures)) where?: Where<KeySignatures>,
  ): Promise<Count> {
    return this.tuneEncodingsRepository.keySignatures(id).delete(where);
  }
}
