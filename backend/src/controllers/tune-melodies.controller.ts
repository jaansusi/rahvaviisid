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
  response,
} from '@loopback/rest';
import {TuneMelodies} from '../models';
import {TuneMelodiesRepository} from '../repositories';

import { UniqueValidationInterceptor } from '../interceptors';
import { intercept } from '@loopback/core';

@intercept(UniqueValidationInterceptor.BINDING_KEY)
export class TuneMelodiesController {
  constructor(
    @repository(TuneMelodiesRepository)
    public tuneMelodiesRepository : TuneMelodiesRepository,
  ) {}

  @post('/tune-melodies')
  @response(200, {
    description: 'TuneMelodies model instance',
    content: {'application/json': {schema: getModelSchemaRef(TuneMelodies)}},
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
          schema: getModelSchemaRef(TuneMelodies, {
            title: 'NewTuneMelodies',
            exclude: ['id'],
          }),
        },
      },
    })
    tuneMelodies: Omit<TuneMelodies, 'id'>,
  ): Promise<TuneMelodies> {
    return this.tuneMelodiesRepository.create(tuneMelodies);
  }

  @get('/tune-melodies/count')
  @response(200, {
    description: 'TuneMelodies model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TuneMelodies) where?: Where<TuneMelodies>,
  ): Promise<Count> {
    return this.tuneMelodiesRepository.count(where);
  }

  @get('/tune-melodies')
  @response(200, {
    description: 'Array of TuneMelodies model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TuneMelodies, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TuneMelodies) filter?: Filter<TuneMelodies>,
  ): Promise<TuneMelodies[]> {
    return this.tuneMelodiesRepository.find(filter);
  }

  @patch('/tune-melodies')
  @response(200, {
    description: 'TuneMelodies PATCH success count',
    content: {'application/json': {schema: CountSchema}},
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
          schema: getModelSchemaRef(TuneMelodies, {partial: true}),
        },
      },
    })
    tuneMelodies: TuneMelodies,
    @param.where(TuneMelodies) where?: Where<TuneMelodies>,
  ): Promise<Count> {
    return this.tuneMelodiesRepository.updateAll(tuneMelodies, where);
  }

  @get('/tune-melodies/{id}')
  @response(200, {
    description: 'TuneMelodies model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TuneMelodies, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TuneMelodies, {exclude: 'where'}) filter?: FilterExcludingWhere<TuneMelodies>
  ): Promise<TuneMelodies> {
    return this.tuneMelodiesRepository.findById(id, filter);
  }

  @patch('/tune-melodies/{id}')
  @response(204, {
    description: 'TuneMelodies PATCH success',
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
          schema: getModelSchemaRef(TuneMelodies, {partial: true}),
        },
      },
    })
    tuneMelodies: TuneMelodies,
  ): Promise<void> {
    await this.tuneMelodiesRepository.updateById(id, tuneMelodies);
  }

  @put('/tune-melodies/{id}')
  @response(204, {
    description: 'TuneMelodies PUT success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tuneMelodies: TuneMelodies,
  ): Promise<void> {
    await this.tuneMelodiesRepository.replaceById(id, tuneMelodies);
  }

  @del('/tune-melodies/{id}')
  @response(204, {
    description: 'TuneMelodies DELETE success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tuneMelodiesRepository.deleteById(id);
  }
}
