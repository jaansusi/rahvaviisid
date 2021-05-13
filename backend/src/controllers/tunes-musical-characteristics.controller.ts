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
  Tunes,
  MusicalCharacteristics,
} from '../models';
import {TunesRepository} from '../repositories';

export class TunesMusicalCharacteristicsController {
  constructor(
    @repository(TunesRepository) protected tunesRepository: TunesRepository,
  ) { }

  @get('/tunes/{id}/musical-characteristics', {
    responses: {
      '200': {
        description: 'Array of Tunes has many MusicalCharacteristics',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MusicalCharacteristics)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<MusicalCharacteristics>,
  ): Promise<MusicalCharacteristics[]> {
    return this.tunesRepository.musicalCharacteristics(id).find(filter);
  }

  @post('/tunes/{id}/musical-characteristics', {
    responses: {
      '200': {
        description: 'Tunes model instance',
        content: {'application/json': {schema: getModelSchemaRef(MusicalCharacteristics)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tunes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MusicalCharacteristics, {
            title: 'NewMusicalCharacteristicsInTunes',
            exclude: ['id'],
            optional: ['tunesId']
          }),
        },
      },
    }) musicalCharacteristics: Omit<MusicalCharacteristics, 'id'>,
  ): Promise<MusicalCharacteristics> {
    return this.tunesRepository.musicalCharacteristics(id).create(musicalCharacteristics);
  }

  @patch('/tunes/{id}/musical-characteristics', {
    responses: {
      '200': {
        description: 'Tunes.MusicalCharacteristics PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MusicalCharacteristics, {partial: true}),
        },
      },
    })
    musicalCharacteristics: Partial<MusicalCharacteristics>,
    @param.query.object('where', getWhereSchemaFor(MusicalCharacteristics)) where?: Where<MusicalCharacteristics>,
  ): Promise<Count> {
    return this.tunesRepository.musicalCharacteristics(id).patch(musicalCharacteristics, where);
  }

  @del('/tunes/{id}/musical-characteristics', {
    responses: {
      '200': {
        description: 'Tunes.MusicalCharacteristics DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(MusicalCharacteristics)) where?: Where<MusicalCharacteristics>,
  ): Promise<Count> {
    return this.tunesRepository.musicalCharacteristics(id).delete(where);
  }
}
