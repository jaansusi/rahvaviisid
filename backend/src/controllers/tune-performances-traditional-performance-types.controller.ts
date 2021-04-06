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
  TraditionalPerformanceTypes,
} from '../models';
import {TunePerformancesRepository} from '../repositories';

export class TunePerformancesTraditionalPerformanceTypesController {
  constructor(
    @repository(TunePerformancesRepository) protected tunePerformancesRepository: TunePerformancesRepository,
  ) { }

  @get('/tune-performances/{id}/traditional-performance-types', {
    responses: {
      '200': {
        description: 'TunePerformances has one TraditionalPerformanceTypes',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TraditionalPerformanceTypes),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TraditionalPerformanceTypes>,
  ): Promise<TraditionalPerformanceTypes> {
    return this.tunePerformancesRepository.traditionalPerformanceTypes(id).get(filter);
  }

  @post('/tune-performances/{id}/traditional-performance-types', {
    responses: {
      '200': {
        description: 'TunePerformances model instance',
        content: {'application/json': {schema: getModelSchemaRef(TraditionalPerformanceTypes)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TunePerformances.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TraditionalPerformanceTypes, {
            title: 'NewTraditionalPerformanceTypesInTunePerformances',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) traditionalPerformanceTypes: Omit<TraditionalPerformanceTypes, 'id'>,
  ): Promise<TraditionalPerformanceTypes> {
    return this.tunePerformancesRepository.traditionalPerformanceTypes(id).create(traditionalPerformanceTypes);
  }

  @patch('/tune-performances/{id}/traditional-performance-types', {
    responses: {
      '200': {
        description: 'TunePerformances.TraditionalPerformanceTypes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TraditionalPerformanceTypes, {partial: true}),
        },
      },
    })
    traditionalPerformanceTypes: Partial<TraditionalPerformanceTypes>,
    @param.query.object('where', getWhereSchemaFor(TraditionalPerformanceTypes)) where?: Where<TraditionalPerformanceTypes>,
  ): Promise<Count> {
    return this.tunePerformancesRepository.traditionalPerformanceTypes(id).patch(traditionalPerformanceTypes, where);
  }

  @del('/tune-performances/{id}/traditional-performance-types', {
    responses: {
      '200': {
        description: 'TunePerformances.TraditionalPerformanceTypes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TraditionalPerformanceTypes)) where?: Where<TraditionalPerformanceTypes>,
  ): Promise<Count> {
    return this.tunePerformancesRepository.traditionalPerformanceTypes(id).delete(where);
  }
}
