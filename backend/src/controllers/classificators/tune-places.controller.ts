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
  response,
} from '@loopback/rest';
import {TunePlaces} from '../../models';
import {TunePlacesRepository} from '../../repositories';

export class TunePlacesController {
  constructor(
    @repository(TunePlacesRepository)
    public tunePlacesRepository : TunePlacesRepository,
  ) {}

  @post('/tune-places')
  @response(200, {
    description: 'TunePlaces model instance',
    content: {'application/json': {schema: getModelSchemaRef(TunePlaces)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TunePlaces, {
            title: 'NewTunePlaces',
            exclude: ['id'],
          }),
        },
      },
    })
    tunePlaces: Omit<TunePlaces, 'id'>,
  ): Promise<TunePlaces> {
    return this.tunePlacesRepository.create(tunePlaces);
  }

  @get('/tune-places/count')
  @response(200, {
    description: 'TunePlaces model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TunePlaces) where?: Where<TunePlaces>,
  ): Promise<Count> {
    return this.tunePlacesRepository.count(where);
  }

  @get('/tune-places')
  @response(200, {
    description: 'Array of TunePlaces model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TunePlaces, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TunePlaces) filter?: Filter<TunePlaces>,
  ): Promise<TunePlaces[]> {
    return this.tunePlacesRepository.find(filter);
  }

  @patch('/tune-places')
  @response(200, {
    description: 'TunePlaces PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TunePlaces, {partial: true}),
        },
      },
    })
    tunePlaces: TunePlaces,
    @param.where(TunePlaces) where?: Where<TunePlaces>,
  ): Promise<Count> {
    return this.tunePlacesRepository.updateAll(tunePlaces, where);
  }

  @get('/tune-places/{id}')
  @response(200, {
    description: 'TunePlaces model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TunePlaces, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TunePlaces, {exclude: 'where'}) filter?: FilterExcludingWhere<TunePlaces>
  ): Promise<TunePlaces> {
    return this.tunePlacesRepository.findById(id, filter);
  }

  @patch('/tune-places/{id}')
  @response(204, {
    description: 'TunePlaces PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TunePlaces, {partial: true}),
        },
      },
    })
    tunePlaces: TunePlaces,
  ): Promise<void> {
    await this.tunePlacesRepository.updateById(id, tunePlaces);
  }

  @put('/tune-places/{id}')
  @response(204, {
    description: 'TunePlaces PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tunePlaces: TunePlaces,
  ): Promise<void> {
    await this.tunePlacesRepository.replaceById(id, tunePlaces);
  }

  @del('/tune-places/{id}')
  @response(204, {
    description: 'TunePlaces DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tunePlacesRepository.deleteById(id);
  }
}
