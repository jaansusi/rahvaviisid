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
import {PersonsRepository} from '../repositories';

export class PersonsController {
  constructor(
    @repository(PersonsRepository)
    public personsRepository : PersonsRepository,
  ) {}

  @post('/persons', {
    responses: {
      '200': {
        description: 'Persons model instance',
        content: {'application/json': {schema: getModelSchemaRef(Persons)}},
      },
    },
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
    await this.personsRepository.updateById(id, persons);
  }

  @put('/persons/{id}', {
    responses: {
      '204': {
        description: 'Persons PUT success',
      },
    },
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
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.personsRepository.deleteById(id);
  }
}
