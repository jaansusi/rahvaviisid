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
  Persons,
} from '../models';
import {TunePlacesRepository} from '../repositories';

export class TunePlacesPersonsController {
  constructor(
    @repository(TunePlacesRepository) protected tunePlacesRepository: TunePlacesRepository,
  ) { }

  @get('/tune-places/{id}/persons', {
    responses: {
      '200': {
        description: 'TunePlaces has one Persons',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Persons),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Persons>,
  ): Promise<Persons> {
    return this.tunePlacesRepository.persons(id).get(filter);
  }

  @post('/tune-places/{id}/persons', {
    responses: {
      '200': {
        description: 'TunePlaces model instance',
        content: {'application/json': {schema: getModelSchemaRef(Persons)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TunePlaces.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persons, {
            title: 'NewPersonsInTunePlaces',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) persons: Omit<Persons, 'id'>,
  ): Promise<Persons> {
    return this.tunePlacesRepository.persons(id).create(persons);
  }

  @patch('/tune-places/{id}/persons', {
    responses: {
      '200': {
        description: 'TunePlaces.Persons PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persons, {partial: true}),
        },
      },
    })
    persons: Partial<Persons>,
    @param.query.object('where', getWhereSchemaFor(Persons)) where?: Where<Persons>,
  ): Promise<Count> {
    return this.tunePlacesRepository.persons(id).patch(persons, where);
  }

  @del('/tune-places/{id}/persons', {
    responses: {
      '200': {
        description: 'TunePlaces.Persons DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Persons)) where?: Where<Persons>,
  ): Promise<Count> {
    return this.tunePlacesRepository.persons(id).delete(where);
  }
}
