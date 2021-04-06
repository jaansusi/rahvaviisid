import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  TunesPersonsRoles,
  TunePersonRoleTypes,
} from '../models';
import {TunesPersonsRolesRepository} from '../repositories';

export class TunesPersonsRolesTunePersonRoleTypesController {
  constructor(
    @repository(TunesPersonsRolesRepository) protected tunesPersonsRolesRepository: TunesPersonsRolesRepository,
  ) { }

  @get('/tunes-persons-roles/{id}/tune-person-role-types', {
    responses: {
      '200': {
        description: 'TunesPersonsRoles has one TunePersonRoleTypes',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TunePersonRoleTypes),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TunePersonRoleTypes>,
  ): Promise<TunePersonRoleTypes> {
    return this.tunesPersonsRolesRepository.tunePersonRoleTypes(id).get(filter);
  }

  @post('/tunes-persons-roles/{id}/tune-person-role-types', {
    responses: {
      '200': {
        description: 'TunesPersonsRoles model instance',
        content: {'application/json': {schema: getModelSchemaRef(TunePersonRoleTypes)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TunesPersonsRoles.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TunePersonRoleTypes, {
            title: 'NewTunePersonRoleTypesInTunesPersonsRoles',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) tunePersonRoleTypes: Omit<TunePersonRoleTypes, 'id'>,
  ): Promise<TunePersonRoleTypes> {
    return this.tunesPersonsRolesRepository.tunePersonRoleTypes(id).create(tunePersonRoleTypes);
  }

  @patch('/tunes-persons-roles/{id}/tune-person-role-types', {
    responses: {
      '200': {
        description: 'TunesPersonsRoles.TunePersonRoleTypes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TunePersonRoleTypes, {partial: true}),
        },
      },
    })
    tunePersonRoleTypes: Partial<TunePersonRoleTypes>,
    @param.query.object('where', getWhereSchemaFor(TunePersonRoleTypes)) where?: Where<TunePersonRoleTypes>,
  ): Promise<Count> {
    return this.tunesPersonsRolesRepository.tunePersonRoleTypes(id).patch(tunePersonRoleTypes, where);
  }

  @del('/tunes-persons-roles/{id}/tune-person-role-types', {
    responses: {
      '200': {
        description: 'TunesPersonsRoles.TunePersonRoleTypes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TunePersonRoleTypes)) where?: Where<TunePersonRoleTypes>,
  ): Promise<Count> {
    return this.tunesPersonsRolesRepository.tunePersonRoleTypes(id).delete(where);
  }
}
