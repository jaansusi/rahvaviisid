import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import { basicAuthorization } from '../services';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Persons} from '../models';
import {PersonsRepository, SexesRepository} from '../repositories';
import { UniqueValidationInterceptor } from '../interceptors';
import { intercept } from '@loopback/core';
import {ValidationError} from '../errors';


@intercept(UniqueValidationInterceptor.BINDING_KEY)
export class PersonsController {
  constructor(
    @repository(PersonsRepository)
    public personsRepository : PersonsRepository,
    @repository(SexesRepository)
    public sexesRepository : SexesRepository,
  ) {}

  @post('/persons', {
    responses: {
      '200': {
        description: 'Persons model instance',
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
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persons, {
            title: 'NewPersons',
            exclude: ['id'],
          }),
        },
      },
    })
    persons: Omit<Persons, 'id'>,
  ): Promise<Persons> {
    if (persons.givenName === '' && persons.surname === '' && persons.nickname === '') {
      let err: ValidationError = new ValidationError(
        'validation.person.noNames',
      );
      err.statusCode = 422;
      throw err;
    }
    return this.personsRepository.create(persons);
  }

  @get('/persons/count', {
    responses: {
      '200': {
        description: 'Persons model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Persons) where?: Where<Persons>,
  ): Promise<Count> {
    return this.personsRepository.count(where);
  }

  @get('/persons', {
    responses: {
      '200': {
        description: 'Array of Persons model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Persons, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Persons) filter?: Filter<Persons>,
  ): Promise<Persons[]> {
    if (filter !== undefined)
      filter.order = ['surname ASC', 'givenName ASC', 'nickname ASC'];
    return this.personsRepository.find(filter);
  }

  @patch('/persons', {
    responses: {
      '200': {
        description: 'Persons PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persons, {partial: true}),
        },
      },
    })
    persons: Persons,
    @param.where(Persons) where?: Where<Persons>,
  ): Promise<Count> {
    return this.personsRepository.updateAll(persons, where);
  }

  @get('/persons/{id}', {
    responses: {
      '200': {
        description: 'Persons model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Persons, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Persons, {exclude: 'where'}) filter?: FilterExcludingWhere<Persons>
  ): Promise<Persons> {
    return this.personsRepository.findById(id, filter);
  }

  @patch('/persons/{id}', {
    responses: {
      '204': {
        description: 'Persons PATCH success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persons, {partial: true}),
        },
      },
    })
    persons: Persons,
  ): Promise<void> {
    if (persons.givenName === '' && persons.surname === '' && persons.nickname === '') {
      let err: ValidationError = new ValidationError(
        'validation.person.noNames',
      );
      err.statusCode = 422;
      throw err;
    }
    await this.personsRepository.updateById(id, persons);
  }

  @put('/persons/{id}', {
    responses: {
      '204': {
        description: 'Persons PUT success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() persons: Persons,
  ): Promise<void> {
    await this.personsRepository.replaceById(id, persons);
  }

  @del('/persons/{id}', {
    responses: {
      '204': {
        description: 'Persons DELETE success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.personsRepository.deleteById(id);
  }
}
