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
  TuneMelodies,
} from '../models';
import {TunesRepository} from '../repositories';

export class TunesTuneMelodiesController {
  constructor(
    @repository(TunesRepository) protected tunesRepository: TunesRepository,
  ) { }

  @get('/tunes/{id}/tune-melodies', {
    responses: {
      '200': {
        description: 'Tunes has one TuneMelodies',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TuneMelodies),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TuneMelodies>,
  ): Promise<TuneMelodies> {
    return this.tunesRepository.tuneMelody(id).get(filter);
  }

  @post('/tunes/{id}/tune-melodies', {
    responses: {
      '200': {
        description: 'Tunes model instance',
        content: {'application/json': {schema: getModelSchemaRef(TuneMelodies)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tunes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TuneMelodies, {
            title: 'NewTuneMelodiesInTunes',
            exclude: ['id'],
            optional: ['tune_id']
          }),
        },
      },
    }) tuneMelodies: Omit<TuneMelodies, 'id'>,
  ): Promise<TuneMelodies> {
    return this.tunesRepository.tuneMelody(id).create(tuneMelodies);
  }

  @patch('/tunes/{id}/tune-melodies', {
    responses: {
      '200': {
        description: 'Tunes.TuneMelodies PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TuneMelodies, {partial: true}),
        },
      },
    })
    tuneMelodies: Partial<TuneMelodies>,
    @param.query.object('where', getWhereSchemaFor(TuneMelodies)) where?: Where<TuneMelodies>,
  ): Promise<Count> {
    return this.tunesRepository.tuneMelody(id).patch(tuneMelodies, where);
  }

  @del('/tunes/{id}/tune-melodies', {
    responses: {
      '200': {
        description: 'Tunes.TuneMelodies DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TuneMelodies)) where?: Where<TuneMelodies>,
  ): Promise<Count> {
    return this.tunesRepository.tuneMelody(id).delete(where);
  }
}
