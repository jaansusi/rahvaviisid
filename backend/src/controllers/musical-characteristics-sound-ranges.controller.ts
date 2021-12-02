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
  MusicalCharacteristics,
  SoundRanges,
} from '../models';
import {MusicalCharacteristicsRepository} from '../repositories';

import { UniqueValidationInterceptor } from '../interceptors';
import { intercept } from '@loopback/core';

@intercept(UniqueValidationInterceptor.BINDING_KEY)
export class MusicalCharacteristicsSoundRangesController {
  constructor(
    @repository(MusicalCharacteristicsRepository) protected musicalCharacteristicsRepository: MusicalCharacteristicsRepository,
  ) { }

  @get('/musical-characteristics/{id}/sound-ranges', {
    responses: {
      '200': {
        description: 'MusicalCharacteristics has one SoundRanges',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SoundRanges),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<SoundRanges>,
  ): Promise<SoundRanges> {
    return this.musicalCharacteristicsRepository.soundRanges(id).get(filter);
  }

  @post('/musical-characteristics/{id}/sound-ranges', {
    responses: {
      '200': {
        description: 'MusicalCharacteristics model instance',
        content: {'application/json': {schema: getModelSchemaRef(SoundRanges)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof MusicalCharacteristics.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SoundRanges, {
            title: 'NewSoundRangesInMusicalCharacteristics',
            exclude: ['id'],
            optional: ['Id']
          }),
        },
      },
    }) soundRanges: Omit<SoundRanges, 'id'>,
  ): Promise<SoundRanges> {
    return this.musicalCharacteristicsRepository.soundRanges(id).create(soundRanges);
  }

  @patch('/musical-characteristics/{id}/sound-ranges', {
    responses: {
      '200': {
        description: 'MusicalCharacteristics.SoundRanges PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SoundRanges, {partial: true}),
        },
      },
    })
    soundRanges: Partial<SoundRanges>,
    @param.query.object('where', getWhereSchemaFor(SoundRanges)) where?: Where<SoundRanges>,
  ): Promise<Count> {
    return this.musicalCharacteristicsRepository.soundRanges(id).patch(soundRanges, where);
  }

  @del('/musical-characteristics/{id}/sound-ranges', {
    responses: {
      '200': {
        description: 'MusicalCharacteristics.SoundRanges DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SoundRanges)) where?: Where<SoundRanges>,
  ): Promise<Count> {
    return this.musicalCharacteristicsRepository.soundRanges(id).delete(where);
  }
}
