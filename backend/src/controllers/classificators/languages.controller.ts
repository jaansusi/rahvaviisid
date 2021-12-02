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
import {Languages} from '../../models';
import {LanguagesRepository} from '../../repositories';

import { UniqueValidationInterceptor } from '../../interceptors';
import { intercept } from '@loopback/core';

@intercept(UniqueValidationInterceptor.BINDING_KEY)
export class LanguagesController {
  constructor(
    @repository(LanguagesRepository)
    public languagesRepository : LanguagesRepository,
  ) {}

  @post('/languages', {
    responses: {
      '200': {
        description: 'Languages model instance',
        content: {'application/json': {schema: getModelSchemaRef(Languages)}},
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
          schema: getModelSchemaRef(Languages, {
            title: 'NewLanguages',
            exclude: ['id'],
          }),
        },
      },
    })
    languages: Omit<Languages, 'id'>,
  ): Promise<Languages> {
    return this.languagesRepository.create(languages);
  }

  @get('/languages/count', {
    responses: {
      '200': {
        description: 'Languages model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Languages) where?: Where<Languages>,
  ): Promise<Count> {
    return this.languagesRepository.count(where);
  }

  @get('/languages', {
    responses: {
      '200': {
        description: 'Array of Languages model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Languages, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Languages) filter?: Filter<Languages>,
  ): Promise<Languages[]> {
    return this.languagesRepository.find(filter);
  }

  @patch('/languages', {
    responses: {
      '200': {
        description: 'Languages PATCH success count',
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
          schema: getModelSchemaRef(Languages, {partial: true}),
        },
      },
    })
    languages: Languages,
    @param.where(Languages) where?: Where<Languages>,
  ): Promise<Count> {
    return this.languagesRepository.updateAll(languages, where);
  }

  @get('/languages/{id}', {
    responses: {
      '200': {
        description: 'Languages model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Languages, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Languages, {exclude: 'where'}) filter?: FilterExcludingWhere<Languages>
  ): Promise<Languages> {
    return this.languagesRepository.findById(id, filter);
  }

  @patch('/languages/{id}', {
    responses: {
      '204': {
        description: 'Languages PATCH success',
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
          schema: getModelSchemaRef(Languages, {partial: true}),
        },
      },
    })
    languages: Languages,
  ): Promise<void> {
    await this.languagesRepository.updateById(id, languages);
  }

  @put('/languages/{id}', {
    responses: {
      '204': {
        description: 'Languages PUT success',
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
    @requestBody() languages: Languages,
  ): Promise<void> {
    await this.languagesRepository.replaceById(id, languages);
  }

  @del('/languages/{id}', {
    responses: {
      '204': {
        description: 'Languages DELETE success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.languagesRepository.deleteById(id);
  }
}
