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
  TunePerformances,
  ActualActionTypes,
} from '../models';
import {TunePerformancesRepository} from '../repositories';

export class TunePerformancesActualActionTypesController {
  constructor(
    @repository(TunePerformancesRepository) protected tunePerformancesRepository: TunePerformancesRepository,
  ) { }

  @get('/tune-performances/{id}/actual-action-types', {
    responses: {
      '200': {
        description: 'TunePerformances has one ActualActionTypes',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ActualActionTypes),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ActualActionTypes>,
  ): Promise<ActualActionTypes> {
    return this.tunePerformancesRepository.actualActionTypes(id).get(filter);
  }

  @post('/tune-performances/{id}/actual-action-types', {
    responses: {
      '200': {
        description: 'TunePerformances model instance',
        content: {'application/json': {schema: getModelSchemaRef(ActualActionTypes)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TunePerformances.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ActualActionTypes, {
            title: 'NewActualActionTypesInTunePerformances',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) actualActionTypes: Omit<ActualActionTypes, 'id'>,
  ): Promise<ActualActionTypes> {
    return this.tunePerformancesRepository.actualActionTypes(id).create(actualActionTypes);
  }

  @patch('/tune-performances/{id}/actual-action-types', {
    responses: {
      '200': {
        description: 'TunePerformances.ActualActionTypes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ActualActionTypes, {partial: true}),
        },
      },
    })
    actualActionTypes: Partial<ActualActionTypes>,
    @param.query.object('where', getWhereSchemaFor(ActualActionTypes)) where?: Where<ActualActionTypes>,
  ): Promise<Count> {
    return this.tunePerformancesRepository.actualActionTypes(id).patch(actualActionTypes, where);
  }

  @del('/tune-performances/{id}/actual-action-types', {
    responses: {
      '200': {
        description: 'TunePerformances.ActualActionTypes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ActualActionTypes)) where?: Where<ActualActionTypes>,
  ): Promise<Count> {
    return this.tunePerformancesRepository.actualActionTypes(id).delete(where);
  }
}
