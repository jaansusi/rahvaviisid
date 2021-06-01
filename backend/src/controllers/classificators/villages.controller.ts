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
import {Villages} from '../../models';
import {VillagesRepository} from '../../repositories';

export class VillagesController {
  constructor(
    @repository(VillagesRepository)
    public villagesRepository : VillagesRepository,
  ) {}

  @post('/villages', {
    responses: {
      '200': {
        description: 'Villages model instance',
        content: {'application/json': {schema: getModelSchemaRef(Villages)}},
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
          schema: getModelSchemaRef(Villages, {
            title: 'NewVillages',
            exclude: ['id'],
          }),
        },
      },
    })
    villages: Omit<Villages, 'id'>,
  ): Promise<Villages> {
    return this.villagesRepository.create(villages);
  }

  @get('/villages/count', {
    responses: {
      '200': {
        description: 'Villages model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Villages) where?: Where<Villages>,
  ): Promise<Count> {
    return this.villagesRepository.count(where);
  }

  @get('/villages', {
    responses: {
      '200': {
        description: 'Array of Villages model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Villages, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Villages) filter?: Filter<Villages>,
  ): Promise<Villages[]> {
    return this.villagesRepository.find(filter);
  }

  @patch('/villages', {
    responses: {
      '200': {
        description: 'Villages PATCH success count',
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
          schema: getModelSchemaRef(Villages, {partial: true}),
        },
      },
    })
    villages: Villages,
    @param.where(Villages) where?: Where<Villages>,
  ): Promise<Count> {
    return this.villagesRepository.updateAll(villages, where);
  }

  @get('/villages/{id}', {
    responses: {
      '200': {
        description: 'Villages model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Villages, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Villages, {exclude: 'where'}) filter?: FilterExcludingWhere<Villages>
  ): Promise<Villages> {
    return this.villagesRepository.findById(id, filter);
  }

  @patch('/villages/{id}', {
    responses: {
      '204': {
        description: 'Villages PATCH success',
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
          schema: getModelSchemaRef(Villages, {partial: true}),
        },
      },
    })
    villages: Villages,
  ): Promise<void> {
    await this.villagesRepository.updateById(id, villages);
  }

  @put('/villages/{id}', {
    responses: {
      '204': {
        description: 'Villages PUT success',
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
    @requestBody() villages: Villages,
  ): Promise<void> {
    await this.villagesRepository.replaceById(id, villages);
  }

  @del('/villages/{id}', {
    responses: {
      '204': {
        description: 'Villages DELETE success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.villagesRepository.deleteById(id);
  }
}
