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
  Municipalities,
} from '../models';
import {TunePlacesRepository} from '../repositories';

export class TunePlacesMunicipalitiesController {
  constructor(
    @repository(TunePlacesRepository) protected tunePlacesRepository: TunePlacesRepository,
  ) { }

  @get('/tune-places/{id}/municipalities', {
    responses: {
      '200': {
        description: 'TunePlaces has one Municipalities',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Municipalities),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Municipalities>,
  ): Promise<Municipalities> {
    return this.tunePlacesRepository.municipalities(id).get(filter);
  }

  @post('/tune-places/{id}/municipalities', {
    responses: {
      '200': {
        description: 'TunePlaces model instance',
        content: {'application/json': {schema: getModelSchemaRef(Municipalities)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TunePlaces.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Municipalities, {
            title: 'NewMunicipalitiesInTunePlaces',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) municipalities: Omit<Municipalities, 'id'>,
  ): Promise<Municipalities> {
    return this.tunePlacesRepository.municipalities(id).create(municipalities);
  }

  @patch('/tune-places/{id}/municipalities', {
    responses: {
      '200': {
        description: 'TunePlaces.Municipalities PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Municipalities, {partial: true}),
        },
      },
    })
    municipalities: Partial<Municipalities>,
    @param.query.object('where', getWhereSchemaFor(Municipalities)) where?: Where<Municipalities>,
  ): Promise<Count> {
    return this.tunePlacesRepository.municipalities(id).patch(municipalities, where);
  }

  @del('/tune-places/{id}/municipalities', {
    responses: {
      '200': {
        description: 'TunePlaces.Municipalities DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Municipalities)) where?: Where<Municipalities>,
  ): Promise<Count> {
    return this.tunePlacesRepository.municipalities(id).delete(where);
  }
}
