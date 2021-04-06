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
  Villages,
} from '../models';
import {TunePlacesRepository} from '../repositories';

export class TunePlacesVillagesController {
  constructor(
    @repository(TunePlacesRepository) protected tunePlacesRepository: TunePlacesRepository,
  ) { }

  @get('/tune-places/{id}/villages', {
    responses: {
      '200': {
        description: 'TunePlaces has one Villages',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Villages),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Villages>,
  ): Promise<Villages> {
    return this.tunePlacesRepository.villages(id).get(filter);
  }

  @post('/tune-places/{id}/villages', {
    responses: {
      '200': {
        description: 'TunePlaces model instance',
        content: {'application/json': {schema: getModelSchemaRef(Villages)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TunePlaces.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Villages, {
            title: 'NewVillagesInTunePlaces',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) villages: Omit<Villages, 'id'>,
  ): Promise<Villages> {
    return this.tunePlacesRepository.villages(id).create(villages);
  }

  @patch('/tune-places/{id}/villages', {
    responses: {
      '200': {
        description: 'TunePlaces.Villages PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Villages, {partial: true}),
        },
      },
    })
    villages: Partial<Villages>,
    @param.query.object('where', getWhereSchemaFor(Villages)) where?: Where<Villages>,
  ): Promise<Count> {
    return this.tunePlacesRepository.villages(id).patch(villages, where);
  }

  @del('/tune-places/{id}/villages', {
    responses: {
      '200': {
        description: 'TunePlaces.Villages DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Villages)) where?: Where<Villages>,
  ): Promise<Count> {
    return this.tunePlacesRepository.villages(id).delete(where);
  }
}
