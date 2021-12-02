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
TunePerformancesTraditionalActionsTypes,
TraditionalActionTypes,
} from '../models';
import {TunePerformancesRepository, TunePerformancesTraditionalActionsTypesRepository} from '../repositories';

import { UniqueValidationInterceptor } from '../interceptors';
import { intercept } from '@loopback/core';

@intercept(UniqueValidationInterceptor.BINDING_KEY)
export class TunePerformancesTraditionalActionTypesController {
  constructor(
    @repository(TunePerformancesRepository) protected tunePerformancesRepository: TunePerformancesRepository,
    @repository(TunePerformancesTraditionalActionsTypesRepository) protected tunePerformancesTraditionalActionTypesRepository: TunePerformancesTraditionalActionsTypesRepository,
  ) { }

  @get('/tune-performances/{id}/traditional-action-types', {
    responses: {
      '200': {
        description: 'Array of TunePerformances has many TraditionalActionTypes through TunePerformancesTraditionalActionsTypes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TraditionalActionTypes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TraditionalActionTypes>,
  ): Promise<TraditionalActionTypes[]> {
    return this.tunePerformancesRepository.traditionalActionTypes(id).find(filter);
  }

  @post('/tune-performances/{id}/traditional-action-types', {
    responses: {
      '200': {
        description: 'create a TraditionalActionTypes model instance',
        content: {'application/json': {schema: getModelSchemaRef(TraditionalActionTypes)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TunePerformances.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TraditionalActionTypes, {
            title: 'NewTraditionalActionTypesInTunePerformances',
            exclude: ['id'],
          }),
        },
      },
    }) traditionalActionTypes: Omit<TraditionalActionTypes, 'id'>,
  ): Promise<TraditionalActionTypes> {
    return this.tunePerformancesRepository.traditionalActionTypes(id).create(traditionalActionTypes);
  }

  @patch('/tune-performances/{id}/traditional-action-types', {
    responses: {
      '200': {
        description: 'TunePerformances.TraditionalActionTypes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TraditionalActionTypes, {partial: true}),
        },
      },
    })
    traditionalActionTypes: Partial<TraditionalActionTypes>,
    @param.query.object('where', getWhereSchemaFor(TraditionalActionTypes)) where?: Where<TraditionalActionTypes>,
  ): Promise<Count> {
    return this.tunePerformancesRepository.traditionalActionTypes(id).patch(traditionalActionTypes, where);
  }

  @del('/tune-performances/{id}/traditional-action-types', {
    responses: {
      '200': {
        description: 'TunePerformances.TraditionalActionTypes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TraditionalActionTypes)) where?: Where<TraditionalActionTypes>,
  ): Promise<Count> {
    return this.tunePerformancesRepository.traditionalActionTypes(id).delete(where);
  }
}
