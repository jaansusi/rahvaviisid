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
  Countries,
} from '../models';
import {TunesRepository} from '../repositories';

export class TunesCountriesController {
  constructor(
    @repository(TunesRepository) protected tunesRepository: TunesRepository,
  ) { }

  @get('/tunes/{id}/countries', {
    responses: {
      '200': {
        description: 'Tunes has one Countries',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Countries),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Countries>,
  ): Promise<Countries> {
    return this.tunesRepository.countries(id).get(filter);
  }

  @post('/tunes/{id}/countries', {
    responses: {
      '200': {
        description: 'Tunes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Countries)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tunes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Countries, {
            title: 'NewCountriesInTunes',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) countries: Omit<Countries, 'id'>,
  ): Promise<Countries> {
    return this.tunesRepository.countries(id).create(countries);
  }

  @patch('/tunes/{id}/countries', {
    responses: {
      '200': {
        description: 'Tunes.Countries PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Countries, {partial: true}),
        },
      },
    })
    countries: Partial<Countries>,
    @param.query.object('where', getWhereSchemaFor(Countries)) where?: Where<Countries>,
  ): Promise<Count> {
    return this.tunesRepository.countries(id).patch(countries, where);
  }

  @del('/tunes/{id}/countries', {
    responses: {
      '200': {
        description: 'Tunes.Countries DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Countries)) where?: Where<Countries>,
  ): Promise<Count> {
    return this.tunesRepository.countries(id).delete(where);
  }
}
