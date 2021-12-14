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
import {SongGenres} from '../../models';
import {SongGenresRepository, TuneSongsRepository, TuneSongsSongGenresRepository, TunesRepository} from '../../repositories';

import { UniqueValidationInterceptor } from '../../interceptors';
import { intercept } from '@loopback/core';

@intercept(UniqueValidationInterceptor.BINDING_KEY)
export class SongGenresController {
  constructor(
    @repository(SongGenresRepository)
    public songGenresRepository : SongGenresRepository,
    @repository(TuneSongsSongGenresRepository)
    public tuneSongsSongGenresRepository : TuneSongsSongGenresRepository,
    @repository(TuneSongsRepository)
    public tuneSongsRepository : TuneSongsRepository,
    @repository(TunesRepository)
    public tunesRepository : TunesRepository,
  ) {}

  @post('/song-genres', {
    responses: {
      '200': {
        description: 'SongGenres model instance',
        content: {'application/json': {schema: getModelSchemaRef(SongGenres)}},
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
          schema: getModelSchemaRef(SongGenres, {
            title: 'NewSongGenres',
            exclude: ['id'],
          }),
        },
      },
    })
    songGenres: Omit<SongGenres, 'id'>,
  ): Promise<SongGenres> {
    return this.songGenresRepository.create(songGenres);
  }

  @get('/song-genres/count', {
    responses: {
      '200': {
        description: 'SongGenres model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(SongGenres) where?: Where<SongGenres>,
  ): Promise<Count> {
    return this.songGenresRepository.count(where);
  }

  @get('/song-genres', {
    responses: {
      '200': {
        description: 'Array of SongGenres model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(SongGenres, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(SongGenres) filter?: Filter<SongGenres>,
  ): Promise<SongGenres[]> {
    return this.songGenresRepository.find(filter);
  }

  @patch('/song-genres', {
    responses: {
      '200': {
        description: 'SongGenres PATCH success count',
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
          schema: getModelSchemaRef(SongGenres, {partial: true}),
        },
      },
    })
    songGenres: SongGenres,
    @param.where(SongGenres) where?: Where<SongGenres>,
  ): Promise<Count> {
    return this.songGenresRepository.updateAll(songGenres, where);
  }

  @get('/song-genres/{id}', {
    responses: {
      '200': {
        description: 'SongGenres model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SongGenres, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SongGenres, {exclude: 'where'}) filter?: FilterExcludingWhere<SongGenres>
  ): Promise<SongGenres> {
    let a = await this.songGenresRepository.findById(id, filter);
    let b = await this.tuneSongsSongGenresRepository.find({
      where: {tuneGenreId: id}
    });
    let c = await this.tuneSongsRepository.find({
      fields: ['tunesId'],
      where: {or:b.map(x=>{return {id: x.tuneSongId}})}
    });
    let d = await this.tunesRepository.find({
      where: {or:c.map(x=>{return {id: x.tunesId}})}
    })
    a.tunes = d;
    return a;
    
  }

  @patch('/song-genres/{id}', {
    responses: {
      '204': {
        description: 'SongGenres PATCH success',
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
          schema: getModelSchemaRef(SongGenres, {partial: true}),
        },
      },
    })
    songGenres: SongGenres,
  ): Promise<void> {
    await this.songGenresRepository.updateById(id, songGenres);
  }

  @put('/song-genres/{id}', {
    responses: {
      '204': {
        description: 'SongGenres PUT success',
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
    @requestBody() songGenres: SongGenres,
  ): Promise<void> {
    await this.songGenresRepository.replaceById(id, songGenres);
  }

  @del('/song-genres/{id}', {
    responses: {
      '204': {
        description: 'SongGenres DELETE success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.songGenresRepository.deleteById(id);
  }
}
