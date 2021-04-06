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
  Languages,
} from '../models';
import {TunesRepository} from '../repositories';

export class TunesLanguagesController {
  constructor(
    @repository(TunesRepository) protected tunesRepository: TunesRepository,
  ) { }

  @get('/tunes/{id}/languages', {
    responses: {
      '200': {
        description: 'Tunes has one Languages',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Languages),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Languages>,
  ): Promise<Languages> {
    return this.tunesRepository.languages(id).get(filter);
  }

  @post('/tunes/{id}/languages', {
    responses: {
      '200': {
        description: 'Tunes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Languages)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tunes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Languages, {
            title: 'NewLanguagesInTunes',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) languages: Omit<Languages, 'id'>,
  ): Promise<Languages> {
    return this.tunesRepository.languages(id).create(languages);
  }

  @patch('/tunes/{id}/languages', {
    responses: {
      '200': {
        description: 'Tunes.Languages PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Languages, {partial: true}),
        },
      },
    })
    languages: Partial<Languages>,
    @param.query.object('where', getWhereSchemaFor(Languages)) where?: Where<Languages>,
  ): Promise<Count> {
    return this.tunesRepository.languages(id).patch(languages, where);
  }

  @del('/tunes/{id}/languages', {
    responses: {
      '200': {
        description: 'Tunes.Languages DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Languages)) where?: Where<Languages>,
  ): Promise<Count> {
    return this.tunesRepository.languages(id).delete(where);
  }
}
