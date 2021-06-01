import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import { basicAuthorization } from '../../services';
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
import {Parishes} from '../../models';
import {ParishesRepository} from '../../repositories';

export class ParishesController {
  constructor(
    @repository(ParishesRepository)
    public parishesRepository : ParishesRepository,
  ) {}

  @post('/parishes', {
    responses: {
      '200': {
        description: 'Parishes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Parishes)}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parishes, {
            title: 'NewParishes',
            exclude: ['id'],
          }),
        },
      },
    })
    parishes: Omit<Parishes, 'id'>,
  ): Promise<Parishes> {
    return this.parishesRepository.create(parishes);
  }

  @get('/parishes/count', {
    responses: {
      '200': {
        description: 'Parishes model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Parishes) where?: Where<Parishes>,
  ): Promise<Count> {
    return this.parishesRepository.count(where);
  }

  @get('/parishes', {
    responses: {
      '200': {
        description: 'Array of Parishes model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Parishes, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Parishes) filter?: Filter<Parishes>,
  ): Promise<Parishes[]> {
    return this.parishesRepository.find(filter);
  }

  @patch('/parishes', {
    responses: {
      '200': {
        description: 'Parishes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parishes, {partial: true}),
        },
      },
    })
    parishes: Parishes,
    @param.where(Parishes) where?: Where<Parishes>,
  ): Promise<Count> {
    return this.parishesRepository.updateAll(parishes, where);
  }

  @get('/parishes/{id}', {
    responses: {
      '200': {
        description: 'Parishes model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Parishes, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Parishes, {exclude: 'where'}) filter?: FilterExcludingWhere<Parishes>
  ): Promise<Parishes> {
    return this.parishesRepository.findById(id, filter);
  }

  @patch('/parishes/{id}', {
    responses: {
      '204': {
        description: 'Parishes PATCH success',
      },
    },
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
          schema: getModelSchemaRef(Parishes, {partial: true}),
        },
      },
    })
    parishes: Parishes,
  ): Promise<void> {
    await this.parishesRepository.updateById(id, parishes);
  }

  @put('/parishes/{id}', {
    responses: {
      '204': {
        description: 'Parishes PUT success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() parishes: Parishes,
  ): Promise<void> {
    await this.parishesRepository.replaceById(id, parishes);
  }

  @del('/parishes/{id}', {
    responses: {
      '204': {
        description: 'Parishes DELETE success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.parishesRepository.deleteById(id);
  }
}
