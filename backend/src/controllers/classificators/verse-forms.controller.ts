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
import {VerseForms} from '../../models';
import {VerseFormsRepository} from '../../repositories';

import { UniqueValidationInterceptor } from '../../interceptors';
import { intercept } from '@loopback/core';

@intercept(UniqueValidationInterceptor.BINDING_KEY)
export class VerseFormsController {
  constructor(
    @repository(VerseFormsRepository)
    public verseFormsRepository : VerseFormsRepository,
  ) {}

  @post('/verse-forms', {
    responses: {
      '200': {
        description: 'VerseForms model instance',
        content: {'application/json': {schema: getModelSchemaRef(VerseForms)}},
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
          schema: getModelSchemaRef(VerseForms, {
            title: 'NewVerseForms',
            exclude: ['id'],
          }),
        },
      },
    })
    verseForms: Omit<VerseForms, 'id'>,
  ): Promise<VerseForms> {
    return this.verseFormsRepository.create(verseForms);
  }

  @get('/verse-forms/count', {
    responses: {
      '200': {
        description: 'VerseForms model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(VerseForms) where?: Where<VerseForms>,
  ): Promise<Count> {
    return this.verseFormsRepository.count(where);
  }

  @get('/verse-forms', {
    responses: {
      '200': {
        description: 'Array of VerseForms model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(VerseForms, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(VerseForms) filter?: Filter<VerseForms>,
  ): Promise<VerseForms[]> {
    return this.verseFormsRepository.find(filter);
  }

  @patch('/verse-forms', {
    responses: {
      '200': {
        description: 'VerseForms PATCH success count',
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
          schema: getModelSchemaRef(VerseForms, {partial: true}),
        },
      },
    })
    verseForms: VerseForms,
    @param.where(VerseForms) where?: Where<VerseForms>,
  ): Promise<Count> {
    return this.verseFormsRepository.updateAll(verseForms, where);
  }

  @get('/verse-forms/{id}', {
    responses: {
      '200': {
        description: 'VerseForms model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(VerseForms, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(VerseForms, {exclude: 'where'}) filter?: FilterExcludingWhere<VerseForms>
  ): Promise<VerseForms> {
    return this.verseFormsRepository.findById(id, filter);
  }

  @patch('/verse-forms/{id}', {
    responses: {
      '204': {
        description: 'VerseForms PATCH success',
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
          schema: getModelSchemaRef(VerseForms, {partial: true}),
        },
      },
    })
    verseForms: VerseForms,
  ): Promise<void> {
    await this.verseFormsRepository.updateById(id, verseForms);
  }

  @put('/verse-forms/{id}', {
    responses: {
      '204': {
        description: 'VerseForms PUT success',
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
    @requestBody() verseForms: VerseForms,
  ): Promise<void> {
    await this.verseFormsRepository.replaceById(id, verseForms);
  }

  @del('/verse-forms/{id}', {
    responses: {
      '204': {
        description: 'VerseForms DELETE success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.verseFormsRepository.deleteById(id);
  }
}
