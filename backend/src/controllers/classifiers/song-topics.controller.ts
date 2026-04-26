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
import {SongTopics} from '../../models';
import {SongTopicsRepository, TuneSongsRepository, TuneSongsSongTopicsRepository, TunesRepository} from '../../repositories';

import { UniqueValidationInterceptor } from '../../interceptors';
import { intercept } from '@loopback/core';

@intercept(UniqueValidationInterceptor.BINDING_KEY)
export class SongTopicsController {
  constructor(
    @repository(SongTopicsRepository)
    public songTopicsRepository : SongTopicsRepository,
    @repository(TuneSongsSongTopicsRepository)
    public tuneSongsSongTopicsRepository : TuneSongsSongTopicsRepository,
    @repository(TuneSongsRepository)
    public tuneSongsRepository : TuneSongsRepository,
    @repository(TunesRepository)
    public tunesRepository : TunesRepository,
  ) {}

  @post('/song-topics', {
    responses: {
      '200': {
        description: 'SongTopics model instance',
        content: {'application/json': {schema: getModelSchemaRef(SongTopics)}},
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
          schema: getModelSchemaRef(SongTopics, {
            title: 'NewSongTopics',
            exclude: ['id'],
          }),
        },
      },
    })
    songTopics: Omit<SongTopics, 'id'>,
  ): Promise<SongTopics> {
    return this.songTopicsRepository.create(songTopics);
  }

  @get('/song-topics/count', {
    responses: {
      '200': {
        description: 'SongTopics model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(SongTopics) where?: Where<SongTopics>,
  ): Promise<Count> {
    return this.songTopicsRepository.count(where);
  }

  @get('/song-topics', {
    responses: {
      '200': {
        description: 'Array of SongTopics model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(SongTopics, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(SongTopics) filter?: Filter<SongTopics>,
  ): Promise<SongTopics[]> {
    return this.songTopicsRepository.find(filter);
  }

  @patch('/song-topics', {
    responses: {
      '200': {
        description: 'SongTopics PATCH success count',
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
          schema: getModelSchemaRef(SongTopics, {partial: true}),
        },
      },
    })
    songTopics: SongTopics,
    @param.where(SongTopics) where?: Where<SongTopics>,
  ): Promise<Count> {
    return this.songTopicsRepository.updateAll(songTopics, where);
  }

  @get('/song-topics/{id}', {
    responses: {
      '200': {
        description: 'SongTopics model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SongTopics, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SongTopics, {exclude: 'where'}) filter?: FilterExcludingWhere<SongTopics>
  ): Promise<SongTopics> {
    let a = await this.songTopicsRepository.findById(id, filter);
    let b = await this.tuneSongsSongTopicsRepository.find({
      where: {songTopicId: id}
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

  @patch('/song-topics/{id}', {
    responses: {
      '204': {
        description: 'SongTopics PATCH success',
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
          schema: getModelSchemaRef(SongTopics, {partial: true}),
        },
      },
    })
    songTopics: SongTopics,
  ): Promise<void> {
    await this.songTopicsRepository.updateById(id, songTopics);
  }

  @put('/song-topics/{id}', {
    responses: {
      '204': {
        description: 'SongTopics PUT success',
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
    @requestBody() songTopics: SongTopics,
  ): Promise<void> {
    await this.songTopicsRepository.replaceById(id, songTopics);
  }

  @del('/song-topics/{id}', {
    responses: {
      '204': {
        description: 'SongTopics DELETE success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.songTopicsRepository.deleteById(id);
  }
}
