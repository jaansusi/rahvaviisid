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
  Pitches,
} from '../models';
import {TuneEncodingsRepository} from '../repositories';

export class TuneEncodingsPitchesController {
  constructor(
    @repository(TuneEncodingsRepository) protected tuneEncodingsRepository: TuneEncodingsRepository,
  ) { }

  @get('/tune-encodings/{id}/pitches', {
    responses: {
      '200': {
        description: 'TuneEncodings has one Pitches',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Pitches),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Pitches>,
  ): Promise<Pitches> {
    return this.tuneEncodingsRepository.pitches(id).get(filter);
  }

  @post('/tune-encodings/{id}/pitches', {
    responses: {
      '200': {
        description: 'TuneEncodings model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pitches)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TuneEncodings.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pitches, {
            title: 'NewPitchesInTuneEncodings',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) pitches: Omit<Pitches, 'id'>,
  ): Promise<Pitches> {
    return this.tuneEncodingsRepository.pitches(id).create(pitches);
  }

  @patch('/tune-encodings/{id}/pitches', {
    responses: {
      '200': {
        description: 'TuneEncodings.Pitches PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pitches, {partial: true}),
        },
      },
    })
    pitches: Partial<Pitches>,
    @param.query.object('where', getWhereSchemaFor(Pitches)) where?: Where<Pitches>,
  ): Promise<Count> {
    return this.tuneEncodingsRepository.pitches(id).patch(pitches, where);
  }

  @del('/tune-encodings/{id}/pitches', {
    responses: {
      '200': {
        description: 'TuneEncodings.Pitches DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Pitches)) where?: Where<Pitches>,
  ): Promise<Count> {
    return this.tuneEncodingsRepository.pitches(id).delete(where);
  }
}
