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
import {TranscriptionPersonRoleTypes} from '../../models';
import {TranscriptionPersonRoleTypesRepository} from '../../repositories';

export class TranscriptionPersonRoleTypesController {
  constructor(
    @repository(TranscriptionPersonRoleTypesRepository)
    public transcriptionPersonRoleTypesRepository : TranscriptionPersonRoleTypesRepository,
  ) {}

  @post('/transcription-person-role-types', {
    responses: {
      '200': {
        description: 'TranscriptionPersonRoleTypes model instance',
        content: {'application/json': {schema: getModelSchemaRef(TranscriptionPersonRoleTypes)}},
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
          schema: getModelSchemaRef(TranscriptionPersonRoleTypes, {
            title: 'NewTranscriptionPersonRoleTypes',
            exclude: ['id'],
          }),
        },
      },
    })
    transcriptionPersonRoleTypes: Omit<TranscriptionPersonRoleTypes, 'id'>,
  ): Promise<TranscriptionPersonRoleTypes> {
    return this.transcriptionPersonRoleTypesRepository.create(transcriptionPersonRoleTypes);
  }

  @get('/transcription-person-role-types/count', {
    responses: {
      '200': {
        description: 'TranscriptionPersonRoleTypes model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TranscriptionPersonRoleTypes) where?: Where<TranscriptionPersonRoleTypes>,
  ): Promise<Count> {
    return this.transcriptionPersonRoleTypesRepository.count(where);
  }

  @get('/transcription-person-role-types', {
    responses: {
      '200': {
        description: 'Array of TranscriptionPersonRoleTypes model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TranscriptionPersonRoleTypes, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TranscriptionPersonRoleTypes) filter?: Filter<TranscriptionPersonRoleTypes>,
  ): Promise<TranscriptionPersonRoleTypes[]> {
    return this.transcriptionPersonRoleTypesRepository.find(filter);
  }

  @patch('/transcription-person-role-types', {
    responses: {
      '200': {
        description: 'TranscriptionPersonRoleTypes PATCH success count',
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
          schema: getModelSchemaRef(TranscriptionPersonRoleTypes, {partial: true}),
        },
      },
    })
    transcriptionPersonRoleTypes: TranscriptionPersonRoleTypes,
    @param.where(TranscriptionPersonRoleTypes) where?: Where<TranscriptionPersonRoleTypes>,
  ): Promise<Count> {
    return this.transcriptionPersonRoleTypesRepository.updateAll(transcriptionPersonRoleTypes, where);
  }

  @get('/transcription-person-role-types/{id}', {
    responses: {
      '200': {
        description: 'TranscriptionPersonRoleTypes model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TranscriptionPersonRoleTypes, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TranscriptionPersonRoleTypes, {exclude: 'where'}) filter?: FilterExcludingWhere<TranscriptionPersonRoleTypes>
  ): Promise<TranscriptionPersonRoleTypes> {
    return this.transcriptionPersonRoleTypesRepository.findById(id, filter);
  }

  @patch('/transcription-person-role-types/{id}', {
    responses: {
      '204': {
        description: 'TranscriptionPersonRoleTypes PATCH success',
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
          schema: getModelSchemaRef(TranscriptionPersonRoleTypes, {partial: true}),
        },
      },
    })
    transcriptionPersonRoleTypes: TranscriptionPersonRoleTypes,
  ): Promise<void> {
    await this.transcriptionPersonRoleTypesRepository.updateById(id, transcriptionPersonRoleTypes);
  }

  @put('/transcription-person-role-types/{id}', {
    responses: {
      '204': {
        description: 'TranscriptionPersonRoleTypes PUT success',
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
    @requestBody() transcriptionPersonRoleTypes: TranscriptionPersonRoleTypes,
  ): Promise<void> {
    await this.transcriptionPersonRoleTypesRepository.replaceById(id, transcriptionPersonRoleTypes);
  }

  @del('/transcription-person-role-types/{id}', {
    responses: {
      '204': {
        description: 'TranscriptionPersonRoleTypes DELETE success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.transcriptionPersonRoleTypesRepository.deleteById(id);
  }
}
