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
  TunesPersonsRoles,
  Persons,
} from '../models';
import {TunesPersonsRolesRepository} from '../repositories';

export class TunesPersonsRolesPersonsController {
  constructor(
    @repository(TunesPersonsRolesRepository) protected tunesPersonsRolesRepository: TunesPersonsRolesRepository,
  ) { }

  @get('/tunes-persons-roles/{id}/persons', {
    responses: {
      '200': {
        description: 'TunesPersonsRoles has one Persons',
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
    return this.tunesPersonsRolesRepository.persons(id).get(filter);
  }

  @post('/tunes-persons-roles/{id}/persons', {
    responses: {
      '200': {
        description: 'TunesPersonsRoles model instance',
        content: {'application/json': {schema: getModelSchemaRef(Persons)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TunesPersonsRoles.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persons, {
            title: 'NewPersonsInTunesPersonsRoles',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) persons: Omit<Persons, 'id'>,
  ): Promise<Persons> {
    return this.tunesPersonsRolesRepository.persons(id).create(persons);
  }

  @patch('/tunes-persons-roles/{id}/persons', {
    responses: {
      '200': {
        description: 'TunesPersonsRoles.Persons PATCH success count',
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
    return this.tunesPersonsRolesRepository.persons(id).patch(persons, where);
  }

  @del('/tunes-persons-roles/{id}/persons', {
    responses: {
      '200': {
        description: 'TunesPersonsRoles.Persons DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Persons)) where?: Where<Persons>,
  ): Promise<Count> {
    return this.tunesPersonsRolesRepository.persons(id).delete(where);
  }
}
