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
  TunePlaceTypes,
} from '../models';
import {TunePlacesRepository} from '../repositories';

export class TunePlacesTunePlaceTypesController {
  constructor(
    @repository(TunePlacesRepository) protected tunePlacesRepository: TunePlacesRepository,
  ) { }

  @get('/tune-places/{id}/tune-place-types', {
    responses: {
      '200': {
        description: 'TunePlaces has one TunePlaceTypes',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TunePlaceTypes),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TunePlaceTypes>,
  ): Promise<TunePlaceTypes> {
    return this.tunePlacesRepository.tunePlaceTypes(id).get(filter);
  }

  @post('/tune-places/{id}/tune-place-types', {
    responses: {
      '200': {
        description: 'TunePlaces model instance',
        content: {'application/json': {schema: getModelSchemaRef(TunePlaceTypes)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TunePlaces.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TunePlaceTypes, {
            title: 'NewTunePlaceTypesInTunePlaces',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) tunePlaceTypes: Omit<TunePlaceTypes, 'id'>,
  ): Promise<TunePlaceTypes> {
    return this.tunePlacesRepository.tunePlaceTypes(id).create(tunePlaceTypes);
  }

  @patch('/tune-places/{id}/tune-place-types', {
    responses: {
      '200': {
        description: 'TunePlaces.TunePlaceTypes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TunePlaceTypes, {partial: true}),
        },
      },
    })
    tunePlaceTypes: Partial<TunePlaceTypes>,
    @param.query.object('where', getWhereSchemaFor(TunePlaceTypes)) where?: Where<TunePlaceTypes>,
  ): Promise<Count> {
    return this.tunePlacesRepository.tunePlaceTypes(id).patch(tunePlaceTypes, where);
  }

  @del('/tune-places/{id}/tune-place-types', {
    responses: {
      '200': {
        description: 'TunePlaces.TunePlaceTypes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TunePlaceTypes)) where?: Where<TunePlaceTypes>,
  ): Promise<Count> {
    return this.tunePlacesRepository.tunePlaceTypes(id).delete(where);
  }
}
