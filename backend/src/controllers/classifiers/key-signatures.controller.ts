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
import {KeySignatures} from '../../models';
import {KeySignaturesRepository} from '../../repositories';

import { UniqueValidationInterceptor } from '../../interceptors';
import { intercept } from '@loopback/core';

@intercept(UniqueValidationInterceptor.BINDING_KEY)
export class KeySignaturesController {
  constructor(
    @repository(KeySignaturesRepository)
    public keySignaturesRepository : KeySignaturesRepository,
  ) {}

  @post('/key-signatures', {
    responses: {
      '200': {
        description: 'KeySignatures model instance',
        content: {'application/json': {schema: getModelSchemaRef(KeySignatures)}},
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
          schema: getModelSchemaRef(KeySignatures, {
            title: 'NewKeySignatures',
            exclude: ['id'],
          }),
        },
      },
    })
    keySignatures: Omit<KeySignatures, 'id'>,
  ): Promise<KeySignatures> {
    return this.keySignaturesRepository.create(keySignatures);
  }

  @get('/key-signatures/count', {
    responses: {
      '200': {
        description: 'KeySignatures model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(KeySignatures) where?: Where<KeySignatures>,
  ): Promise<Count> {
    return this.keySignaturesRepository.count(where);
  }

  @get('/key-signatures', {
    responses: {
      '200': {
        description: 'Array of KeySignatures model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(KeySignatures, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(KeySignatures) filter?: Filter<KeySignatures>,
  ): Promise<KeySignatures[]> {
    return this.keySignaturesRepository.find(filter);
  }

  @patch('/key-signatures', {
    responses: {
      '200': {
        description: 'KeySignatures PATCH success count',
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
          schema: getModelSchemaRef(KeySignatures, {partial: true}),
        },
      },
    })
    keySignatures: KeySignatures,
    @param.where(KeySignatures) where?: Where<KeySignatures>,
  ): Promise<Count> {
    return this.keySignaturesRepository.updateAll(keySignatures, where);
  }

  @get('/key-signatures/{id}', {
    responses: {
      '200': {
        description: 'KeySignatures model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(KeySignatures, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(KeySignatures, {exclude: 'where'}) filter?: FilterExcludingWhere<KeySignatures>
  ): Promise<KeySignatures> {
    return this.keySignaturesRepository.findById(id, filter);
  }

  @patch('/key-signatures/{id}', {
    responses: {
      '204': {
        description: 'KeySignatures PATCH success',
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
          schema: getModelSchemaRef(KeySignatures, {partial: true}),
        },
      },
    })
    keySignatures: KeySignatures,
  ): Promise<void> {
    await this.keySignaturesRepository.updateById(id, keySignatures);
  }

  @put('/key-signatures/{id}', {
    responses: {
      '204': {
        description: 'KeySignatures PUT success',
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
    @requestBody() keySignatures: KeySignatures,
  ): Promise<void> {
    await this.keySignaturesRepository.replaceById(id, keySignatures);
  }

  @del('/key-signatures/{id}', {
    responses: {
      '204': {
        description: 'KeySignatures DELETE success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.keySignaturesRepository.deleteById(id);
  }
}
