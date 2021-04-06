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
  Measures,
} from '../models';
import {TuneEncodingsRepository} from '../repositories';

export class TuneEncodingsMeasuresController {
  constructor(
    @repository(TuneEncodingsRepository) protected tuneEncodingsRepository: TuneEncodingsRepository,
  ) { }

  @get('/tune-encodings/{id}/measures', {
    responses: {
      '200': {
        description: 'TuneEncodings has one Measures',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Measures),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Measures>,
  ): Promise<Measures> {
    return this.tuneEncodingsRepository.measures(id).get(filter);
  }

  @post('/tune-encodings/{id}/measures', {
    responses: {
      '200': {
        description: 'TuneEncodings model instance',
        content: {'application/json': {schema: getModelSchemaRef(Measures)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TuneEncodings.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Measures, {
            title: 'NewMeasuresInTuneEncodings',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) measures: Omit<Measures, 'id'>,
  ): Promise<Measures> {
    return this.tuneEncodingsRepository.measures(id).create(measures);
  }

  @patch('/tune-encodings/{id}/measures', {
    responses: {
      '200': {
        description: 'TuneEncodings.Measures PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Measures, {partial: true}),
        },
      },
    })
    measures: Partial<Measures>,
    @param.query.object('where', getWhereSchemaFor(Measures)) where?: Where<Measures>,
  ): Promise<Count> {
    return this.tuneEncodingsRepository.measures(id).patch(measures, where);
  }

  @del('/tune-encodings/{id}/measures', {
    responses: {
      '200': {
        description: 'TuneEncodings.Measures DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Measures)) where?: Where<Measures>,
  ): Promise<Count> {
    return this.tuneEncodingsRepository.measures(id).delete(where);
  }
}
