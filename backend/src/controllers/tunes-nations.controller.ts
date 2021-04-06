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
  Nations,
} from '../models';
import {TunesRepository} from '../repositories';

export class TunesNationsController {
  constructor(
    @repository(TunesRepository) protected tunesRepository: TunesRepository,
  ) { }

  @get('/tunes/{id}/nations', {
    responses: {
      '200': {
        description: 'Tunes has one Nations',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Nations),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Nations>,
  ): Promise<Nations> {
    return this.tunesRepository.nations(id).get(filter);
  }

  @post('/tunes/{id}/nations', {
    responses: {
      '200': {
        description: 'Tunes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Nations)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tunes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Nations, {
            title: 'NewNationsInTunes',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) nations: Omit<Nations, 'id'>,
  ): Promise<Nations> {
    return this.tunesRepository.nations(id).create(nations);
  }

  @patch('/tunes/{id}/nations', {
    responses: {
      '200': {
        description: 'Tunes.Nations PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Nations, {partial: true}),
        },
      },
    })
    nations: Partial<Nations>,
    @param.query.object('where', getWhereSchemaFor(Nations)) where?: Where<Nations>,
  ): Promise<Count> {
    return this.tunesRepository.nations(id).patch(nations, where);
  }

  @del('/tunes/{id}/nations', {
    responses: {
      '200': {
        description: 'Tunes.Nations DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Nations)) where?: Where<Nations>,
  ): Promise<Count> {
    return this.tunesRepository.nations(id).delete(where);
  }
}
