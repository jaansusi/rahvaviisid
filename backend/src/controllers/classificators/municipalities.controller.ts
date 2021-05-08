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
import {Municipalities} from '../../models';
import {MunicipalitiesRepository} from '../../repositories';

export class MunicipalitiesController {
  constructor(
    @repository(MunicipalitiesRepository)
    public municipalitiesRepository : MunicipalitiesRepository,
  ) {}

  @post('/municipalities', {
    responses: {
      '200': {
        description: 'Municipalities model instance',
        content: {'application/json': {schema: getModelSchemaRef(Municipalities)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Municipalities, {
            title: 'NewMunicipalities',
            exclude: ['id'],
          }),
        },
      },
    })
    municipalities: Omit<Municipalities, 'id'>,
  ): Promise<Municipalities> {
    return this.municipalitiesRepository.create(municipalities);
  }

  @get('/municipalities/count', {
    responses: {
      '200': {
        description: 'Municipalities model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Municipalities) where?: Where<Municipalities>,
  ): Promise<Count> {
    return this.municipalitiesRepository.count(where);
  }

  @get('/municipalities', {
    responses: {
      '200': {
        description: 'Array of Municipalities model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Municipalities, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Municipalities) filter?: Filter<Municipalities>,
  ): Promise<Municipalities[]> {
    return this.municipalitiesRepository.find(filter);
  }

  @patch('/municipalities', {
    responses: {
      '200': {
        description: 'Municipalities PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Municipalities, {partial: true}),
        },
      },
    })
    municipalities: Municipalities,
    @param.where(Municipalities) where?: Where<Municipalities>,
  ): Promise<Count> {
    return this.municipalitiesRepository.updateAll(municipalities, where);
  }

  @get('/municipalities/{id}', {
    responses: {
      '200': {
        description: 'Municipalities model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Municipalities, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Municipalities, {exclude: 'where'}) filter?: FilterExcludingWhere<Municipalities>
  ): Promise<Municipalities> {
    return this.municipalitiesRepository.findById(id, filter);
  }

  @patch('/municipalities/{id}', {
    responses: {
      '204': {
        description: 'Municipalities PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Municipalities, {partial: true}),
        },
      },
    })
    municipalities: Municipalities,
  ): Promise<void> {
    await this.municipalitiesRepository.updateById(id, municipalities);
  }

  @put('/municipalities/{id}', {
    responses: {
      '204': {
        description: 'Municipalities PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() municipalities: Municipalities,
  ): Promise<void> {
    await this.municipalitiesRepository.replaceById(id, municipalities);
  }

  @del('/municipalities/{id}', {
    responses: {
      '204': {
        description: 'Municipalities DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.municipalitiesRepository.deleteById(id);
  }
}
