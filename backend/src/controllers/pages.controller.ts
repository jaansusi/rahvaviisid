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
import {Pages} from '../models';
import {PagesRepository} from '../repositories';

export class PagesController {
  constructor(
    @repository(PagesRepository)
    public pagesRepository : PagesRepository,
  ) {}

  @post('/pages')
  @response(200, {
    description: 'Pages model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pages)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pages, {
            title: 'NewPages',
            exclude: ['id'],
          }),
        },
      },
    })
    pages: Omit<Pages, 'id'>,
  ): Promise<Pages> {
    return this.pagesRepository.create(pages);
  }

  @get('/pages/count')
  @response(200, {
    description: 'Pages model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pages) where?: Where<Pages>,
  ): Promise<Count> {
    return this.pagesRepository.count(where);
  }

  @get('/pages')
  @response(200, {
    description: 'Array of Pages model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pages, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pages) filter?: Filter<Pages>,
  ): Promise<Pages[]> {
    return this.pagesRepository.find(filter);
  }

  @patch('/pages')
  @response(200, {
    description: 'Pages PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pages, {partial: true}),
        },
      },
    })
    pages: Pages,
    @param.where(Pages) where?: Where<Pages>,
  ): Promise<Count> {
    return this.pagesRepository.updateAll(pages, where);
  }

  @get('/pages/{id}')
  @response(200, {
    description: 'Pages model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pages, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Pages, {exclude: 'where'}) filter?: FilterExcludingWhere<Pages>
  ): Promise<Pages> {
    return this.pagesRepository.findById(id, filter);
  }

  @patch('/pages/{id}')
  @response(204, {
    description: 'Pages PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pages, {partial: true}),
        },
      },
    })
    pages: Pages,
  ): Promise<void> {
    await this.pagesRepository.updateById(id, pages);
  }

  @put('/pages/{id}')
  @response(204, {
    description: 'Pages PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() pages: Pages,
  ): Promise<void> {
    await this.pagesRepository.replaceById(id, pages);
  }

  @del('/pages/{id}')
  @response(204, {
    description: 'Pages DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pagesRepository.deleteById(id);
  }
}
