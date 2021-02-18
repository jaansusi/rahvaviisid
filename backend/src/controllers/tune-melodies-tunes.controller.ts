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
  TuneMelodies,
  Tunes,
} from '../models';
import {TuneMelodiesRepository} from '../repositories';

export class TuneMelodiesTunesController {
  constructor(
    @repository(TuneMelodiesRepository) protected tuneMelodiesRepository: TuneMelodiesRepository,
  ) { }

  @get('/tune-melodies/{id}/tunes', {
    responses: {
      '200': {
        description: 'TuneMelodies has one Tunes',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Tunes),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Tunes>,
  ): Promise<Tunes> {
    return this.tuneMelodiesRepository.tunes(id).get(filter);
  }

  @post('/tune-melodies/{id}/tunes', {
    responses: {
      '200': {
        description: 'TuneMelodies model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tunes)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TuneMelodies.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tunes, {
            title: 'NewTunesInTuneMelodies',
            exclude: ['id'],
            optional: ['tune_melody_id']
          }),
        },
      },
    }) tunes: Omit<Tunes, 'id'>,
  ): Promise<Tunes> {
    return this.tuneMelodiesRepository.tunes(id).create(tunes);
  }

  @patch('/tune-melodies/{id}/tunes', {
    responses: {
      '200': {
        description: 'TuneMelodies.Tunes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tunes, {partial: true}),
        },
      },
    })
    tunes: Partial<Tunes>,
    @param.query.object('where', getWhereSchemaFor(Tunes)) where?: Where<Tunes>,
  ): Promise<Count> {
    return this.tuneMelodiesRepository.tunes(id).patch(tunes, where);
  }

  @del('/tune-melodies/{id}/tunes', {
    responses: {
      '200': {
        description: 'TuneMelodies.Tunes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Tunes)) where?: Where<Tunes>,
  ): Promise<Count> {
    return this.tuneMelodiesRepository.tunes(id).delete(where);
  }
}
