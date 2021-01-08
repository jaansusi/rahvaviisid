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
import {UserRoleTypes} from '../models';
import {UserRoleTypesRepository} from '../repositories';

export class UserRoleTypesController {
  constructor(
    @repository(UserRoleTypesRepository)
    public userRoleTypesRepository : UserRoleTypesRepository,
  ) {}

  @post('/user-role-types', {
    responses: {
      '200': {
        description: 'UserRoleTypes model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserRoleTypes)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserRoleTypes, {
            title: 'NewUserRoleTypes',
            exclude: ['id'],
          }),
        },
      },
    })
    userRoleTypes: Omit<UserRoleTypes, 'id'>,
  ): Promise<UserRoleTypes> {
    return this.userRoleTypesRepository.create(userRoleTypes);
  }

  @get('/user-role-types/count', {
    responses: {
      '200': {
        description: 'UserRoleTypes model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(UserRoleTypes) where?: Where<UserRoleTypes>,
  ): Promise<Count> {
    return this.userRoleTypesRepository.count(where);
  }

  @get('/user-role-types', {
    responses: {
      '200': {
        description: 'Array of UserRoleTypes model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(UserRoleTypes, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(UserRoleTypes) filter?: Filter<UserRoleTypes>,
  ): Promise<UserRoleTypes[]> {
    return this.userRoleTypesRepository.find(filter);
  }

  @patch('/user-role-types', {
    responses: {
      '200': {
        description: 'UserRoleTypes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserRoleTypes, {partial: true}),
        },
      },
    })
    userRoleTypes: UserRoleTypes,
    @param.where(UserRoleTypes) where?: Where<UserRoleTypes>,
  ): Promise<Count> {
    return this.userRoleTypesRepository.updateAll(userRoleTypes, where);
  }

  @get('/user-role-types/{id}', {
    responses: {
      '200': {
        description: 'UserRoleTypes model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UserRoleTypes, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(UserRoleTypes, {exclude: 'where'}) filter?: FilterExcludingWhere<UserRoleTypes>
  ): Promise<UserRoleTypes> {
    return this.userRoleTypesRepository.findById(id, filter);
  }

  @patch('/user-role-types/{id}', {
    responses: {
      '204': {
        description: 'UserRoleTypes PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserRoleTypes, {partial: true}),
        },
      },
    })
    userRoleTypes: UserRoleTypes,
  ): Promise<void> {
    await this.userRoleTypesRepository.updateById(id, userRoleTypes);
  }

  @put('/user-role-types/{id}', {
    responses: {
      '204': {
        description: 'UserRoleTypes PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() userRoleTypes: UserRoleTypes,
  ): Promise<void> {
    await this.userRoleTypesRepository.replaceById(id, userRoleTypes);
  }

  @del('/user-role-types/{id}', {
    responses: {
      '204': {
        description: 'UserRoleTypes DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userRoleTypesRepository.deleteById(id);
  }
}
