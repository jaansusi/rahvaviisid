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
import {TuneForms} from '../../models';
import {TuneFormsRepository, MusicalCharacteristicsTuneFormsRepository, MusicalCharacteristicsRepository, TunesRepository} from '../../repositories';

import { UniqueValidationInterceptor } from '../../interceptors';
import { intercept } from '@loopback/core';

@intercept(UniqueValidationInterceptor.BINDING_KEY)
export class TuneFormsController {
  constructor(
    @repository(TuneFormsRepository)
    public tuneFormsRepository : TuneFormsRepository,
    @repository(MusicalCharacteristicsTuneFormsRepository)
    public musicalCharacteristicsTuneFormsRepository : MusicalCharacteristicsTuneFormsRepository,
    @repository(MusicalCharacteristicsRepository)
    public musicalCharacteristicsRepository : MusicalCharacteristicsRepository,
    @repository(TunesRepository)
    public tunesRepository : TunesRepository,
  ) {}

  @post('/tune-forms', {
    responses: {
      '200': {
        description: 'TuneForms model instance',
        content: {'application/json': {schema: getModelSchemaRef(TuneForms)}},
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
          schema: getModelSchemaRef(TuneForms, {
            title: 'NewTuneForms',
            exclude: ['id'],
          }),
        },
      },
    })
    tuneForms: Omit<TuneForms, 'id'>,
  ): Promise<TuneForms> {
    return this.tuneFormsRepository.create(tuneForms);
  }

  @get('/tune-forms/count', {
    responses: {
      '200': {
        description: 'TuneForms model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TuneForms) where?: Where<TuneForms>,
  ): Promise<Count> {
    return this.tuneFormsRepository.count(where);
  }

  @get('/tune-forms', {
    responses: {
      '200': {
        description: 'Array of TuneForms model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TuneForms, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TuneForms) filter?: Filter<TuneForms>,
  ): Promise<TuneForms[]> {
    return this.tuneFormsRepository.find(filter);
  }

  @patch('/tune-forms', {
    responses: {
      '200': {
        description: 'TuneForms PATCH success count',
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
          schema: getModelSchemaRef(TuneForms, {partial: true}),
        },
      },
    })
    tuneForms: TuneForms,
    @param.where(TuneForms) where?: Where<TuneForms>,
  ): Promise<Count> {
    return this.tuneFormsRepository.updateAll(tuneForms, where);
  }

  @get('/tune-forms/{id}', {
    responses: {
      '200': {
        description: 'TuneForms model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TuneForms, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TuneForms, {exclude: 'where'}) filter?: FilterExcludingWhere<TuneForms>
  ): Promise<TuneForms> {
    let a = await this.tuneFormsRepository.findById(id, filter);
    let b = await this.musicalCharacteristicsTuneFormsRepository.find({
      where: {tuneFormId: id}
    });
    if (b.length === 0)
     return a;
    let c = await this.musicalCharacteristicsRepository.find({
      fields: ['tunesId'],
      where: {or:b.map(x=>{return {id: x.musicalCharacteristicId}})}
    });
    if (c.length === 0)
      return a;
    let d = await this.tunesRepository.find({
      where: {or:c.map(x=>{return {id: x.tunesId}})}
    })
    a.tunes = d;
    return a;

  }

  @patch('/tune-forms/{id}', {
    responses: {
      '204': {
        description: 'TuneForms PATCH success',
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
          schema: getModelSchemaRef(TuneForms, {partial: true}),
        },
      },
    })
    tuneForms: TuneForms,
  ): Promise<void> {
    await this.tuneFormsRepository.updateById(id, tuneForms);
  }

  @put('/tune-forms/{id}', {
    responses: {
      '204': {
        description: 'TuneForms PUT success',
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
    @requestBody() tuneForms: TuneForms,
  ): Promise<void> {
    await this.tuneFormsRepository.replaceById(id, tuneForms);
  }

  @del('/tune-forms/{id}', {
    responses: {
      '204': {
        description: 'TuneForms DELETE success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tuneFormsRepository.deleteById(id);
  }
}
