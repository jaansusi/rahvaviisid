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
  ActualPerformanceTypes,
} from '../models';
import {TunePerformancesRepository} from '../repositories';

export class TunePerformancesActualPerformanceTypesController {
  constructor(
    @repository(TunePerformancesRepository) protected tunePerformancesRepository: TunePerformancesRepository,
  ) { }

  @get('/tune-performances/{id}/actual-performance-types', {
    responses: {
      '200': {
        description: 'TunePerformances has one ActualPerformanceTypes',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ActualPerformanceTypes),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ActualPerformanceTypes>,
  ): Promise<ActualPerformanceTypes> {
    return this.tunePerformancesRepository.actualPerformanceTypes(id).get(filter);
  }

  @post('/tune-performances/{id}/actual-performance-types', {
    responses: {
      '200': {
        description: 'TunePerformances model instance',
        content: {'application/json': {schema: getModelSchemaRef(ActualPerformanceTypes)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TunePerformances.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ActualPerformanceTypes, {
            title: 'NewActualPerformanceTypesInTunePerformances',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) actualPerformanceTypes: Omit<ActualPerformanceTypes, 'id'>,
  ): Promise<ActualPerformanceTypes> {
    return this.tunePerformancesRepository.actualPerformanceTypes(id).create(actualPerformanceTypes);
  }

  @patch('/tune-performances/{id}/actual-performance-types', {
    responses: {
      '200': {
        description: 'TunePerformances.ActualPerformanceTypes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ActualPerformanceTypes, {partial: true}),
        },
      },
    })
    actualPerformanceTypes: Partial<ActualPerformanceTypes>,
    @param.query.object('where', getWhereSchemaFor(ActualPerformanceTypes)) where?: Where<ActualPerformanceTypes>,
  ): Promise<Count> {
    return this.tunePerformancesRepository.actualPerformanceTypes(id).patch(actualPerformanceTypes, where);
  }

  @del('/tune-performances/{id}/actual-performance-types', {
    responses: {
      '200': {
        description: 'TunePerformances.ActualPerformanceTypes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ActualPerformanceTypes)) where?: Where<ActualPerformanceTypes>,
  ): Promise<Count> {
    return this.tunePerformancesRepository.actualPerformanceTypes(id).delete(where);
  }
}
