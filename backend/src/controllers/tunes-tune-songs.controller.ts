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
  TuneSongs,
} from '../models';
import {TunesRepository} from '../repositories';

export class TunesTuneSongsController {
  constructor(
    @repository(TunesRepository) protected tunesRepository: TunesRepository,
  ) { }

  @get('/tunes/{id}/tune-songs', {
    responses: {
      '200': {
        description: 'Array of Tunes has many TuneSongs',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TuneSongs)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TuneSongs>,
  ): Promise<TuneSongs[]> {
    return this.tunesRepository.tuneSongs(id).find(filter);
  }

  @post('/tunes/{id}/tune-songs', {
    responses: {
      '200': {
        description: 'Tunes model instance',
        content: {'application/json': {schema: getModelSchemaRef(TuneSongs)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tunes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TuneSongs, {
            title: 'NewTuneSongsInTunes',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) tuneSongs: Omit<TuneSongs, 'id'>,
  ): Promise<TuneSongs> {
    return this.tunesRepository.tuneSongs(id).create(tuneSongs);
  }

  @patch('/tunes/{id}/tune-songs', {
    responses: {
      '200': {
        description: 'Tunes.TuneSongs PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TuneSongs, {partial: true}),
        },
      },
    })
    tuneSongs: Partial<TuneSongs>,
    @param.query.object('where', getWhereSchemaFor(TuneSongs)) where?: Where<TuneSongs>,
  ): Promise<Count> {
    return this.tunesRepository.tuneSongs(id).patch(tuneSongs, where);
  }

  @del('/tunes/{id}/tune-songs', {
    responses: {
      '200': {
        description: 'Tunes.TuneSongs DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TuneSongs)) where?: Where<TuneSongs>,
  ): Promise<Count> {
    return this.tunesRepository.tuneSongs(id).delete(where);
  }
}
