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
import {TuneTranscriptions} from '../models';
import {TuneTranscriptionsRepository} from '../repositories';

import { UniqueValidationInterceptor } from '../interceptors';
import { intercept } from '@loopback/core';

@intercept(UniqueValidationInterceptor.BINDING_KEY)
export class TuneTranscriptionsController {
  constructor(
    @repository(TuneTranscriptionsRepository)
    public tuneTranscriptionsRepository : TuneTranscriptionsRepository,
  ) {}

  @post('/tune-transcriptions')
  @response(200, {
    description: 'TuneTranscriptions model instance',
    content: {'application/json': {schema: getModelSchemaRef(TuneTranscriptions)}},
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
          schema: getModelSchemaRef(TuneTranscriptions, {
            title: 'NewTuneTranscriptions',
            exclude: ['id'],
          }),
        },
      },
    })
    TuneTranscriptions: Omit<TuneTranscriptions, 'id'>,
  ): Promise<TuneTranscriptions> {
    return this.tuneTranscriptionsRepository.create(TuneTranscriptions);
  }

  @get('/tune-transcriptions/count')
  @response(200, {
    description: 'TuneTranscriptions model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TuneTranscriptions) where?: Where<TuneTranscriptions>,
  ): Promise<Count> {
    return this.tuneTranscriptionsRepository.count(where);
  }

  @get('/tune-transcriptions')
  @response(200, {
    description: 'Array of TuneTranscriptions model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TuneTranscriptions, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TuneTranscriptions) filter?: Filter<TuneTranscriptions>,
  ): Promise<TuneTranscriptions[]> {
    return this.tuneTranscriptionsRepository.find(filter);
  }

  @patch('/tune-transcriptions')
  @response(200, {
    description: 'TuneTranscriptions PATCH success count',
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
          schema: getModelSchemaRef(TuneTranscriptions, {partial: true}),
        },
      },
    })
    TuneTranscriptions: TuneTranscriptions,
    @param.where(TuneTranscriptions) where?: Where<TuneTranscriptions>,
  ): Promise<Count> {
    return this.tuneTranscriptionsRepository.updateAll(TuneTranscriptions, where);
  }

  @get('/tune-transcriptions/{id}')
  @response(200, {
    description: 'TuneTranscriptions model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TuneTranscriptions, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TuneTranscriptions, {exclude: 'where'}) filter?: FilterExcludingWhere<TuneTranscriptions>
  ): Promise<TuneTranscriptions> {
    return this.tuneTranscriptionsRepository.findById(id, filter);
  }

  @patch('/tune-transcriptions/{id}')
  @response(204, {
    description: 'TuneTranscriptions PATCH success',
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
          schema: getModelSchemaRef(TuneTranscriptions, {partial: true}),
        },
      },
    })
    TuneTranscriptions: TuneTranscriptions,
  ): Promise<void> {
    await this.tuneTranscriptionsRepository.updateById(id, TuneTranscriptions);
  }

  @put('/tune-transcriptions/{id}')
  @response(204, {
    description: 'TuneTranscriptions PUT success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() TuneTranscriptions: TuneTranscriptions,
  ): Promise<void> {
    await this.tuneTranscriptionsRepository.replaceById(id, TuneTranscriptions);
  }

  @del('/tune-transcriptions/{id}')
  @response(204, {
    description: 'TuneTranscriptions DELETE success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tuneTranscriptionsRepository.deleteById(id);
  }
}
