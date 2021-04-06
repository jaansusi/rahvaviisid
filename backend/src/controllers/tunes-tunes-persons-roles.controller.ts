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
  Tunes,
  TunesPersonsRoles,
} from '../models';
import {TunesRepository} from '../repositories';

export class TunesTunesPersonsRolesController {
  constructor(
    @repository(TunesRepository) protected tunesRepository: TunesRepository,
  ) { }

  @get('/tunes/{id}/tunes-persons-roles', {
    responses: {
      '200': {
        description: 'Array of Tunes has many TunesPersonsRoles',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TunesPersonsRoles)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TunesPersonsRoles>,
  ): Promise<TunesPersonsRoles[]> {
    return this.tunesRepository.tunesPersonsRoles(id).find(filter);
  }

  @post('/tunes/{id}/tunes-persons-roles', {
    responses: {
      '200': {
        description: 'Tunes model instance',
        content: {'application/json': {schema: getModelSchemaRef(TunesPersonsRoles)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tunes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TunesPersonsRoles, {
            title: 'NewTunesPersonsRolesInTunes',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) tunesPersonsRoles: Omit<TunesPersonsRoles, 'id'>,
  ): Promise<TunesPersonsRoles> {
    return this.tunesRepository.tunesPersonsRoles(id).create(tunesPersonsRoles);
  }

  @patch('/tunes/{id}/tunes-persons-roles', {
    responses: {
      '200': {
        description: 'Tunes.TunesPersonsRoles PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TunesPersonsRoles, {partial: true}),
        },
      },
    })
    tunesPersonsRoles: Partial<TunesPersonsRoles>,
    @param.query.object('where', getWhereSchemaFor(TunesPersonsRoles)) where?: Where<TunesPersonsRoles>,
  ): Promise<Count> {
    return this.tunesRepository.tunesPersonsRoles(id).patch(tunesPersonsRoles, where);
  }

  @del('/tunes/{id}/tunes-persons-roles', {
    responses: {
      '200': {
        description: 'Tunes.TunesPersonsRoles DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TunesPersonsRoles)) where?: Where<TunesPersonsRoles>,
  ): Promise<Count> {
    return this.tunesRepository.tunesPersonsRoles(id).delete(where);
  }
}
