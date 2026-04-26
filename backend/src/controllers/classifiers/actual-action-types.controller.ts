import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import { basicAuthorization } from '../../services';
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
import {ActualActionTypes} from '../../models';
import {ActualActionTypesRepository} from '../../repositories';

import { UniqueValidationInterceptor } from '../../interceptors';
import { intercept } from '@loopback/core';

@intercept(UniqueValidationInterceptor.BINDING_KEY)
export class ActualActionTypesController {
  constructor(
    @repository(ActualActionTypesRepository)
    public actualActionTypesRepository : ActualActionTypesRepository,
  ) {}

  @post('/actual-action-types', {
    responses: {
      '200': {
        description: 'ActualActionTypes model instance',
        content: {'application/json': {schema: getModelSchemaRef(ActualActionTypes)}},
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
          schema: getModelSchemaRef(ActualActionTypes, {
            title: 'NewActualActionTypes',
            exclude: ['id'],
          }),
        },
      },
    })
    actualActionTypes: Omit<ActualActionTypes, 'id'>,
  ): Promise<ActualActionTypes> {
    return this.actualActionTypesRepository.create(actualActionTypes);
  }

  @get('/actual-action-types/count', {
    responses: {
      '200': {
        description: 'ActualActionTypes model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(ActualActionTypes) where?: Where<ActualActionTypes>,
  ): Promise<Count> {
    return this.actualActionTypesRepository.count(where);
  }

  @get('/actual-action-types', {
    responses: {
      '200': {
        description: 'Array of ActualActionTypes model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ActualActionTypes, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ActualActionTypes) filter?: Filter<ActualActionTypes>,
  ): Promise<ActualActionTypes[]> {
    return this.actualActionTypesRepository.find(filter);
  }

  @patch('/actual-action-types', {
    responses: {
      '200': {
        description: 'ActualActionTypes PATCH success count',
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
          schema: getModelSchemaRef(ActualActionTypes, {partial: true}),
        },
      },
    })
    actualActionTypes: ActualActionTypes,
    @param.where(ActualActionTypes) where?: Where<ActualActionTypes>,
  ): Promise<Count> {
    return this.actualActionTypesRepository.updateAll(actualActionTypes, where);
  }

  @get('/actual-action-types/{id}', {
    responses: {
      '200': {
        description: 'ActualActionTypes model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ActualActionTypes, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ActualActionTypes, {exclude: 'where'}) filter?: FilterExcludingWhere<ActualActionTypes>
  ): Promise<ActualActionTypes> {
    return this.actualActionTypesRepository.findById(id, filter);
  }

  @patch('/actual-action-types/{id}', {
    responses: {
      '204': {
        description: 'ActualActionTypes PATCH success',
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
          schema: getModelSchemaRef(ActualActionTypes, {partial: true}),
        },
      },
    })
    actualActionTypes: ActualActionTypes,
  ): Promise<void> {
    await this.actualActionTypesRepository.updateById(id, actualActionTypes);
  }

  @put('/actual-action-types/{id}', {
    responses: {
      '204': {
        description: 'ActualActionTypes PUT success',
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
    @requestBody() actualActionTypes: ActualActionTypes,
  ): Promise<void> {
    await this.actualActionTypesRepository.replaceById(id, actualActionTypes);
  }

  @del('/actual-action-types/{id}', {
    responses: {
      '204': {
        description: 'ActualActionTypes DELETE success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.actualActionTypesRepository.deleteById(id);
  }
}
