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
  Tunes,
  TuneEncodings,
} from '../models';
import {TunesRepository} from '../repositories';

export class TunesTuneEncodingsController {
  constructor(
    @repository(TunesRepository) protected tunesRepository: TunesRepository,
  ) { }

  @get('/tunes/{id}/tune-encodings', {
    responses: {
      '200': {
        description: 'Array of Tunes has many TuneEncodings',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TuneEncodings)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TuneEncodings>,
  ): Promise<TuneEncodings[]> {
    return this.tunesRepository.tuneEncodings(id).find(filter);
  }

  @post('/tunes/{id}/tune-encodings', {
    responses: {
      '200': {
        description: 'Tunes model instance',
        content: {'application/json': {schema: getModelSchemaRef(TuneEncodings)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tunes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TuneEncodings, {
            title: 'NewTuneEncodingsInTunes',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) tuneEncodings: Omit<TuneEncodings, 'id'>,
  ): Promise<TuneEncodings> {
    return this.tunesRepository.tuneEncodings(id).create(tuneEncodings);
  }

  @patch('/tunes/{id}/tune-encodings', {
    responses: {
      '200': {
        description: 'Tunes.TuneEncodings PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TuneEncodings, {partial: true}),
        },
      },
    })
    tuneEncodings: Partial<TuneEncodings>,
    @param.query.object('where', getWhereSchemaFor(TuneEncodings)) where?: Where<TuneEncodings>,
  ): Promise<Count> {
    return this.tunesRepository.tuneEncodings(id).patch(tuneEncodings, where);
  }

  @del('/tunes/{id}/tune-encodings', {
    responses: {
      '200': {
        description: 'Tunes.TuneEncodings DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TuneEncodings)) where?: Where<TuneEncodings>,
  ): Promise<Count> {
    return this.tunesRepository.tuneEncodings(id).delete(where);
  }
}
