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
  TunePerformances,
} from '../models';
import {TunesRepository} from '../repositories';

export class TunesTunePerformancesController {
  constructor(
    @repository(TunesRepository) protected tunesRepository: TunesRepository,
  ) { }

  @get('/tunes/{id}/tune-performances', {
    responses: {
      '200': {
        description: 'Array of Tunes has many TunePerformances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TunePerformances)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TunePerformances>,
  ): Promise<TunePerformances[]> {
    return this.tunesRepository.tunePerformances(id).find(filter);
  }

  @post('/tunes/{id}/tune-performances', {
    responses: {
      '200': {
        description: 'Tunes model instance',
        content: {'application/json': {schema: getModelSchemaRef(TunePerformances)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tunes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TunePerformances, {
            title: 'NewTunePerformancesInTunes',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) tunePerformances: Omit<TunePerformances, 'id'>,
  ): Promise<TunePerformances> {
    return this.tunesRepository.tunePerformances(id).create(tunePerformances);
  }

  @patch('/tunes/{id}/tune-performances', {
    responses: {
      '200': {
        description: 'Tunes.TunePerformances PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TunePerformances, {partial: true}),
        },
      },
    })
    tunePerformances: Partial<TunePerformances>,
    @param.query.object('where', getWhereSchemaFor(TunePerformances)) where?: Where<TunePerformances>,
  ): Promise<Count> {
    return this.tunesRepository.tunePerformances(id).patch(tunePerformances, where);
  }

  @del('/tunes/{id}/tune-performances', {
    responses: {
      '200': {
        description: 'Tunes.TunePerformances DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TunePerformances)) where?: Where<TunePerformances>,
  ): Promise<Count> {
    return this.tunesRepository.tunePerformances(id).delete(where);
  }
}
