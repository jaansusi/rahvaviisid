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
import {SupportSounds} from '../../models';
import {SupportSoundsRepository} from '../../repositories';

import { UniqueValidationInterceptor } from '../../interceptors';
import { intercept } from '@loopback/core';

@intercept(UniqueValidationInterceptor.BINDING_KEY)
export class SupportSoundsController {
  constructor(
    @repository(SupportSoundsRepository)
    public supportSoundsRepository : SupportSoundsRepository,
  ) {}

  @post('/support-sounds', {
    responses: {
      '200': {
        description: 'SupportSounds model instance',
        content: {'application/json': {schema: getModelSchemaRef(SupportSounds)}},
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
          schema: getModelSchemaRef(SupportSounds, {
            title: 'NewSupportSounds',
            exclude: ['id'],
          }),
        },
      },
    })
    supportSounds: Omit<SupportSounds, 'id'>,
  ): Promise<SupportSounds> {
    return this.supportSoundsRepository.create(supportSounds);
  }

  @get('/support-sounds/count', {
    responses: {
      '200': {
        description: 'SupportSounds model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(SupportSounds) where?: Where<SupportSounds>,
  ): Promise<Count> {
    return this.supportSoundsRepository.count(where);
  }

  @get('/support-sounds', {
    responses: {
      '200': {
        description: 'Array of SupportSounds model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(SupportSounds, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(SupportSounds) filter?: Filter<SupportSounds>,
  ): Promise<SupportSounds[]> {
    return this.supportSoundsRepository.find(filter);
  }

  @patch('/support-sounds', {
    responses: {
      '200': {
        description: 'SupportSounds PATCH success count',
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
          schema: getModelSchemaRef(SupportSounds, {partial: true}),
        },
      },
    })
    supportSounds: SupportSounds,
    @param.where(SupportSounds) where?: Where<SupportSounds>,
  ): Promise<Count> {
    return this.supportSoundsRepository.updateAll(supportSounds, where);
  }

  @get('/support-sounds/{id}', {
    responses: {
      '200': {
        description: 'SupportSounds model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SupportSounds, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SupportSounds, {exclude: 'where'}) filter?: FilterExcludingWhere<SupportSounds>
  ): Promise<SupportSounds> {
    return this.supportSoundsRepository.findById(id, filter);
  }

  @patch('/support-sounds/{id}', {
    responses: {
      '204': {
        description: 'SupportSounds PATCH success',
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
          schema: getModelSchemaRef(SupportSounds, {partial: true}),
        },
      },
    })
    supportSounds: SupportSounds,
  ): Promise<void> {
    await this.supportSoundsRepository.updateById(id, supportSounds);
  }

  @put('/support-sounds/{id}', {
    responses: {
      '204': {
        description: 'SupportSounds PUT success',
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
    @requestBody() supportSounds: SupportSounds,
  ): Promise<void> {
    await this.supportSoundsRepository.replaceById(id, supportSounds);
  }

  @del('/support-sounds/{id}', {
    responses: {
      '204': {
        description: 'SupportSounds DELETE success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.supportSoundsRepository.deleteById(id);
  }
}
