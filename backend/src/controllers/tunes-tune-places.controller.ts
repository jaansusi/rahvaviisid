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
  TunePlaces,
} from '../models';
import {TunesRepository} from '../repositories';

export class TunesTunePlacesController {
  constructor(
    @repository(TunesRepository) protected tunesRepository: TunesRepository,
  ) { }

  @get('/tunes/{id}/tune-places', {
    responses: {
      '200': {
        description: 'Array of Tunes has many TunePlaces',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TunePlaces)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TunePlaces>,
  ): Promise<TunePlaces[]> {
    return this.tunesRepository.tunePlaces(id).find(filter);
  }

  @post('/tunes/{id}/tune-places', {
    responses: {
      '200': {
        description: 'Tunes model instance',
        content: {'application/json': {schema: getModelSchemaRef(TunePlaces)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tunes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TunePlaces, {
            title: 'NewTunePlacesInTunes',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) tunePlaces: Omit<TunePlaces, 'id'>,
  ): Promise<TunePlaces> {
    return this.tunesRepository.tunePlaces(id).create(tunePlaces);
  }

  @patch('/tunes/{id}/tune-places', {
    responses: {
      '200': {
        description: 'Tunes.TunePlaces PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TunePlaces, {partial: true}),
        },
      },
    })
    tunePlaces: Partial<TunePlaces>,
    @param.query.object('where', getWhereSchemaFor(TunePlaces)) where?: Where<TunePlaces>,
  ): Promise<Count> {
    return this.tunesRepository.tunePlaces(id).patch(tunePlaces, where);
  }

  @del('/tunes/{id}/tune-places', {
    responses: {
      '200': {
        description: 'Tunes.TunePlaces DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TunePlaces)) where?: Where<TunePlaces>,
  ): Promise<Count> {
    return this.tunesRepository.tunePlaces(id).delete(where);
  }
}
