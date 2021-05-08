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
import {Countries} from '../../models';
import {CountriesRepository} from '../../repositories';

export class CountriesController {
  constructor(
    @repository(CountriesRepository)
    public countriesRepository : CountriesRepository,
  ) {}

  @post('/countries', {
    responses: {
      '200': {
        description: 'Countries model instance',
        content: {'application/json': {schema: getModelSchemaRef(Countries)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Countries, {
            title: 'NewCountries',
            exclude: ['id'],
          }),
        },
      },
    })
    countries: Omit<Countries, 'id'>,
  ): Promise<Countries> {
    return this.countriesRepository.create(countries);
  }

  @get('/countries/count', {
    responses: {
      '200': {
        description: 'Countries model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Countries) where?: Where<Countries>,
  ): Promise<Count> {
    return this.countriesRepository.count(where);
  }

  @get('/countries', {
    responses: {
      '200': {
        description: 'Array of Countries model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Countries, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Countries) filter?: Filter<Countries>,
  ): Promise<Countries[]> {
    return this.countriesRepository.find(filter);
  }

  @patch('/countries', {
    responses: {
      '200': {
        description: 'Countries PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Countries, {partial: true}),
        },
      },
    })
    countries: Countries,
    @param.where(Countries) where?: Where<Countries>,
  ): Promise<Count> {
    return this.countriesRepository.updateAll(countries, where);
  }

  @get('/countries/{id}', {
    responses: {
      '200': {
        description: 'Countries model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Countries, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Countries, {exclude: 'where'}) filter?: FilterExcludingWhere<Countries>
  ): Promise<Countries> {
    return this.countriesRepository.findById(id, filter);
  }

  @patch('/countries/{id}', {
    responses: {
      '204': {
        description: 'Countries PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Countries, {partial: true}),
        },
      },
    })
    countries: Countries,
  ): Promise<void> {
    await this.countriesRepository.updateById(id, countries);
  }

  @put('/countries/{id}', {
    responses: {
      '204': {
        description: 'Countries PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() countries: Countries,
  ): Promise<void> {
    await this.countriesRepository.replaceById(id, countries);
  }

  @del('/countries/{id}', {
    responses: {
      '204': {
        description: 'Countries DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.countriesRepository.deleteById(id);
  }
}
