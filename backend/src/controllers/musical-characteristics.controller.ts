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
import {MusicalCharacteristics} from '../models';
import {MusicalCharacteristicsRepository} from '../repositories';

import { UniqueValidationInterceptor } from '../interceptors';
import { intercept } from '@loopback/core';

@intercept(UniqueValidationInterceptor.BINDING_KEY)
export class MusicalCharacteristicsController {
  constructor(
    @repository(MusicalCharacteristicsRepository)
    public musicalCharacteristicsRepository : MusicalCharacteristicsRepository,
  ) {}

  @post('/musical-characteristics')
  @response(200, {
    description: 'MusicalCharacteristics model instance',
    content: {'application/json': {schema: getModelSchemaRef(MusicalCharacteristics)}},
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
          schema: getModelSchemaRef(MusicalCharacteristics, {
            title: 'NewMusicalCharacteristics',
            exclude: ['id'],
          }),
        },
      },
    })
    musicalCharacteristics: Omit<MusicalCharacteristics, 'id'>,
  ): Promise<MusicalCharacteristics> {
    return this.musicalCharacteristicsRepository.create(musicalCharacteristics);
  }

  @get('/musical-characteristics/count')
  @response(200, {
    description: 'MusicalCharacteristics model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MusicalCharacteristics) where?: Where<MusicalCharacteristics>,
  ): Promise<Count> {
    return this.musicalCharacteristicsRepository.count(where);
  }

  @get('/musical-characteristics')
  @response(200, {
    description: 'Array of MusicalCharacteristics model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MusicalCharacteristics, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MusicalCharacteristics) filter?: Filter<MusicalCharacteristics>,
  ): Promise<MusicalCharacteristics[]> {
    return this.musicalCharacteristicsRepository.find(filter);
  }

  @patch('/musical-characteristics')
  @response(200, {
    description: 'MusicalCharacteristics PATCH success count',
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
          schema: getModelSchemaRef(MusicalCharacteristics, {partial: true}),
        },
      },
    })
    musicalCharacteristics: MusicalCharacteristics,
    @param.where(MusicalCharacteristics) where?: Where<MusicalCharacteristics>,
  ): Promise<Count> {
    return this.musicalCharacteristicsRepository.updateAll(musicalCharacteristics, where);
  }

  @get('/musical-characteristics/{id}')
  @response(200, {
    description: 'MusicalCharacteristics model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MusicalCharacteristics, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MusicalCharacteristics, {exclude: 'where'}) filter?: FilterExcludingWhere<MusicalCharacteristics>
  ): Promise<MusicalCharacteristics> {
    return this.musicalCharacteristicsRepository.findById(id, filter);
  }

  @patch('/musical-characteristics/{id}')
  @response(204, {
    description: 'MusicalCharacteristics PATCH success',
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
          schema: getModelSchemaRef(MusicalCharacteristics, {partial: true}),
        },
      },
    })
    musicalCharacteristics: MusicalCharacteristics,
  ): Promise<void> {
    await this.musicalCharacteristicsRepository.updateById(id, musicalCharacteristics);
  }

  @put('/musical-characteristics/{id}')
  @response(204, {
    description: 'MusicalCharacteristics PUT success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() musicalCharacteristics: MusicalCharacteristics,
  ): Promise<void> {
    await this.musicalCharacteristicsRepository.replaceById(id, musicalCharacteristics);
  }

  @del('/musical-characteristics/{id}')
  @response(204, {
    description: 'MusicalCharacteristics DELETE success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.musicalCharacteristicsRepository.deleteById(id);
  }
}
