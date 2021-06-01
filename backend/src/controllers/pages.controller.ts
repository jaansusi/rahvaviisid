import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import { basicAuthorization } from '../services';
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
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
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

}
