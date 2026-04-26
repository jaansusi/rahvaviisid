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
import {TuneStates} from '../../models';
import {TuneStatesRepository} from '../../repositories';

import { UniqueValidationInterceptor } from '../../interceptors';
import { intercept } from '@loopback/core';

@intercept(UniqueValidationInterceptor.BINDING_KEY)
export class TuneStatesController {
  constructor(
    @repository(TuneStatesRepository)
    public tuneStatesRepository : TuneStatesRepository,
  ) {}

  @post('/tune-states', {
    responses: {
      '200': {
        description: 'TuneStates model instance',
        content: {'application/json': {schema: getModelSchemaRef(TuneStates)}},
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
          schema: getModelSchemaRef(TuneStates, {
            title: 'NewTuneStates',
            exclude: ['id'],
          }),
        },
      },
    })
    tuneStates: Omit<TuneStates, 'id'>,
  ): Promise<TuneStates> {
    return this.tuneStatesRepository.create(tuneStates);
  }

  @get('/tune-states/count', {
    responses: {
      '200': {
        description: 'TuneStates model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TuneStates) where?: Where<TuneStates>,
  ): Promise<Count> {
    return this.tuneStatesRepository.count(where);
  }

  @get('/tune-states', {
    responses: {
      '200': {
        description: 'Array of TuneStates model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TuneStates, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TuneStates) filter?: Filter<TuneStates>,
  ): Promise<TuneStates[]> {
    return this.tuneStatesRepository.find(filter);
  }

  @patch('/tune-states', {
    responses: {
      '200': {
        description: 'TuneStates PATCH success count',
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
          schema: getModelSchemaRef(TuneStates, {partial: true}),
        },
      },
    })
    tuneStates: TuneStates,
    @param.where(TuneStates) where?: Where<TuneStates>,
  ): Promise<Count> {
    return this.tuneStatesRepository.updateAll(tuneStates, where);
  }

  @get('/tune-states/{id}', {
    responses: {
      '200': {
        description: 'TuneStates model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TuneStates, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TuneStates, {exclude: 'where'}) filter?: FilterExcludingWhere<TuneStates>
  ): Promise<TuneStates> {
    return this.tuneStatesRepository.findById(id, filter);
  }

  @patch('/tune-states/{id}', {
    responses: {
      '204': {
        description: 'TuneStates PATCH success',
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
          schema: getModelSchemaRef(TuneStates, {partial: true}),
        },
      },
    })
    tuneStates: TuneStates,
  ): Promise<void> {
    await this.tuneStatesRepository.updateById(id, tuneStates);
  }

  @put('/tune-states/{id}', {
    responses: {
      '204': {
        description: 'TuneStates PUT success',
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
    @requestBody() tuneStates: TuneStates,
  ): Promise<void> {
    await this.tuneStatesRepository.replaceById(id, tuneStates);
  }

  @del('/tune-states/{id}', {
    responses: {
      '204': {
        description: 'TuneStates DELETE success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tuneStatesRepository.deleteById(id);
  }
}
