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
  TunePlaces,
  Parishes,
} from '../models';
import {TunePlacesRepository} from '../repositories';

export class TunePlacesParishesController {
  constructor(
    @repository(TunePlacesRepository) protected tunePlacesRepository: TunePlacesRepository,
  ) { }

  @get('/tune-places/{id}/parishes', {
    responses: {
      '200': {
        description: 'TunePlaces has one Parishes',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Parishes),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Parishes>,
  ): Promise<Parishes> {
    return this.tunePlacesRepository.parishes(id).get(filter);
  }

  @post('/tune-places/{id}/parishes', {
    responses: {
      '200': {
        description: 'TunePlaces model instance',
        content: {'application/json': {schema: getModelSchemaRef(Parishes)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TunePlaces.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parishes, {
            title: 'NewParishesInTunePlaces',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) parishes: Omit<Parishes, 'id'>,
  ): Promise<Parishes> {
    return this.tunePlacesRepository.parishes(id).create(parishes);
  }

  @patch('/tune-places/{id}/parishes', {
    responses: {
      '200': {
        description: 'TunePlaces.Parishes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parishes, {partial: true}),
        },
      },
    })
    parishes: Partial<Parishes>,
    @param.query.object('where', getWhereSchemaFor(Parishes)) where?: Where<Parishes>,
  ): Promise<Count> {
    return this.tunePlacesRepository.parishes(id).patch(parishes, where);
  }

  @del('/tune-places/{id}/parishes', {
    responses: {
      '200': {
        description: 'TunePlaces.Parishes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Parishes)) where?: Where<Parishes>,
  ): Promise<Count> {
    return this.tunePlacesRepository.parishes(id).delete(where);
  }
}
