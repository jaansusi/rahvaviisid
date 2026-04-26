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
import {TuneGenres} from '../../models';
import {TuneGenresRepository, TuneSongsRepository, TuneSongsTuneGenresRepository, TunesRepository} from '../../repositories';

import { UniqueValidationInterceptor } from '../../interceptors';
import { intercept } from '@loopback/core';

@intercept(UniqueValidationInterceptor.BINDING_KEY)
export class TuneGenresController {
  constructor(
    @repository(TuneGenresRepository)
    public tuneGenresRepository : TuneGenresRepository,
    @repository(TuneSongsTuneGenresRepository)
    public tuneSongsTuneGenresRepository : TuneSongsTuneGenresRepository,
    @repository(TuneSongsRepository)
    public tuneSongsRepository : TuneSongsRepository,
    @repository(TunesRepository)
    public tunesRepository : TunesRepository,
  ) {}

  @post('/tune-genres', {
    responses: {
      '200': {
        description: 'TuneGenres model instance',
        content: {'application/json': {schema: getModelSchemaRef(TuneGenres)}},
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
          schema: getModelSchemaRef(TuneGenres, {
            title: 'NewTuneGenres',
            exclude: ['id'],
          }),
        },
      },
    })
    tuneGenres: Omit<TuneGenres, 'id'>,
  ): Promise<TuneGenres> {
    return this.tuneGenresRepository.create(tuneGenres);
  }

  @get('/tune-genres/count', {
    responses: {
      '200': {
        description: 'TuneGenres model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TuneGenres) where?: Where<TuneGenres>,
  ): Promise<Count> {
    return this.tuneGenresRepository.count(where);
  }

  @get('/tune-genres', {
    responses: {
      '200': {
        description: 'Array of TuneGenres model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TuneGenres, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TuneGenres) filter?: Filter<TuneGenres>,
  ): Promise<TuneGenres[]> {
    return this.tuneGenresRepository.find(filter);
  }

  @patch('/tune-genres', {
    responses: {
      '200': {
        description: 'TuneGenres PATCH success count',
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
          schema: getModelSchemaRef(TuneGenres, {partial: true}),
        },
      },
    })
    tuneGenres: TuneGenres,
    @param.where(TuneGenres) where?: Where<TuneGenres>,
  ): Promise<Count> {
    return this.tuneGenresRepository.updateAll(tuneGenres, where);
  }

  @get('/tune-genres/{id}', {
    responses: {
      '200': {
        description: 'TuneGenres model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TuneGenres, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TuneGenres, {exclude: 'where'}) filter?: FilterExcludingWhere<TuneGenres>
  ): Promise<TuneGenres> {
    let a = await this.tuneGenresRepository.findById(id, filter);
    let b = await this.tuneSongsTuneGenresRepository.find({
      where: {tuneGenreId: id}
    });
    if (b.length === 0)
      return a;
    let c = await this.tuneSongsRepository.find({
      fields: ['tunesId'],
      where: {or:b.map(x=>{return {id: x.tuneSongId}})}
    });
    if (c.length === 0)
      return a;
    let d = await this.tunesRepository.find({
      where: {or:c.map(x=>{return {id: x.tunesId}})}
    })
    a.tunes = d;
    return a;
  }

  @patch('/tune-genres/{id}', {
    responses: {
      '204': {
        description: 'TuneGenres PATCH success',
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
          schema: getModelSchemaRef(TuneGenres, {partial: true}),
        },
      },
    })
    tuneGenres: TuneGenres,
  ): Promise<void> {
    await this.tuneGenresRepository.updateById(id, tuneGenres);
  }

  @put('/tune-genres/{id}', {
    responses: {
      '204': {
        description: 'TuneGenres PUT success',
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
    @requestBody() tuneGenres: TuneGenres,
  ): Promise<void> {
    await this.tuneGenresRepository.replaceById(id, tuneGenres);
  }

  @del('/tune-genres/{id}', {
    responses: {
      '204': {
        description: 'TuneGenres DELETE success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tuneGenresRepository.deleteById(id);
  }
}
