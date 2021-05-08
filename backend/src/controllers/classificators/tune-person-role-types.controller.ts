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
import {TunePersonRoleTypes} from '../../models';
import {TunePersonRoleTypesRepository} from '../../repositories';

export class TunePersonRoleTypesController {
  constructor(
    @repository(TunePersonRoleTypesRepository)
    public tunePersonRoleTypesRepository : TunePersonRoleTypesRepository,
  ) {}

  @post('/tune-person-role-types', {
    responses: {
      '200': {
        description: 'TunePersonRoleTypes model instance',
        content: {'application/json': {schema: getModelSchemaRef(TunePersonRoleTypes)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TunePersonRoleTypes, {
            title: 'NewTunePersonRoleTypes',
            exclude: ['id'],
          }),
        },
      },
    })
    tunePersonRoleTypes: Omit<TunePersonRoleTypes, 'id'>,
  ): Promise<TunePersonRoleTypes> {
    return this.tunePersonRoleTypesRepository.create(tunePersonRoleTypes);
  }

  @get('/tune-person-role-types/count', {
    responses: {
      '200': {
        description: 'TunePersonRoleTypes model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TunePersonRoleTypes) where?: Where<TunePersonRoleTypes>,
  ): Promise<Count> {
    return this.tunePersonRoleTypesRepository.count(where);
  }

  @get('/tune-person-role-types', {
    responses: {
      '200': {
        description: 'Array of TunePersonRoleTypes model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TunePersonRoleTypes, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TunePersonRoleTypes) filter?: Filter<TunePersonRoleTypes>,
  ): Promise<TunePersonRoleTypes[]> {
    return this.tunePersonRoleTypesRepository.find(filter);
  }

  @patch('/tune-person-role-types', {
    responses: {
      '200': {
        description: 'TunePersonRoleTypes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TunePersonRoleTypes, {partial: true}),
        },
      },
    })
    tunePersonRoleTypes: TunePersonRoleTypes,
    @param.where(TunePersonRoleTypes) where?: Where<TunePersonRoleTypes>,
  ): Promise<Count> {
    return this.tunePersonRoleTypesRepository.updateAll(tunePersonRoleTypes, where);
  }

  @get('/tune-person-role-types/{id}', {
    responses: {
      '200': {
        description: 'TunePersonRoleTypes model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TunePersonRoleTypes, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TunePersonRoleTypes, {exclude: 'where'}) filter?: FilterExcludingWhere<TunePersonRoleTypes>
  ): Promise<TunePersonRoleTypes> {
    return this.tunePersonRoleTypesRepository.findById(id, filter);
  }

  @patch('/tune-person-role-types/{id}', {
    responses: {
      '204': {
        description: 'TunePersonRoleTypes PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TunePersonRoleTypes, {partial: true}),
        },
      },
    })
    tunePersonRoleTypes: TunePersonRoleTypes,
  ): Promise<void> {
    await this.tunePersonRoleTypesRepository.updateById(id, tunePersonRoleTypes);
  }

  @put('/tune-person-role-types/{id}', {
    responses: {
      '204': {
        description: 'TunePersonRoleTypes PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tunePersonRoleTypes: TunePersonRoleTypes,
  ): Promise<void> {
    await this.tunePersonRoleTypesRepository.replaceById(id, tunePersonRoleTypes);
  }

  @del('/tune-person-role-types/{id}', {
    responses: {
      '204': {
        description: 'TunePersonRoleTypes DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tunePersonRoleTypesRepository.deleteById(id);
  }
}
