import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import { basicAuthorization } from '../services';
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
  Sexes,
  Persons,
} from '../models';
import {SexesRepository} from '../repositories';

import { UniqueValidationInterceptor } from '../interceptors';
import { intercept } from '@loopback/core';

@intercept(UniqueValidationInterceptor.BINDING_KEY)
export class SexesPersonsController {
  constructor(
    @repository(SexesRepository) protected sexesRepository: SexesRepository,
  ) { }

  @get('/sexes/{id}/persons', {
    responses: {
      '200': {
        description: 'Sexes has one Persons',
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
    return this.sexesRepository.persons(id).get(filter);
  }

  @post('/sexes/{id}/persons', {
    responses: {
      '200': {
        description: 'Sexes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Persons)}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async create(
    @param.path.number('id') id: typeof Sexes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persons, {
            title: 'NewPersonsInSexes',
            exclude: ['id'],
            optional: ['sexId']
          }),
        },
      },
    }) persons: Omit<Persons, 'id'>,
  ): Promise<Persons> {
    return this.sexesRepository.persons(id).create(persons);
  }

  @patch('/sexes/{id}/persons', {
    responses: {
      '200': {
        description: 'Sexes.Persons PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
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
    return this.sexesRepository.persons(id).patch(persons, where);
  }

  @del('/sexes/{id}/persons', {
    responses: {
      '200': {
        description: 'Sexes.Persons DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Persons)) where?: Where<Persons>,
  ): Promise<Count> {
    return this.sexesRepository.persons(id).delete(where);
  }
}
