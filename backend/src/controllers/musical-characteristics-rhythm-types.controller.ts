import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import { basicAuthorization } from '../services';
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
MusicalCharacteristicsRhythmTypes,
RhythmTypes,
} from '../models';
import {MusicalCharacteristicsRepository} from '../repositories';

export class MusicalCharacteristicsRhythmTypesController {
  constructor(
    @repository(MusicalCharacteristicsRepository) protected musicalCharacteristicsRepository: MusicalCharacteristicsRepository,
  ) { }

  @get('/musical-characteristics/{id}/rhythm-types', {
    responses: {
      '200': {
        description: 'Array of MusicalCharacteristics has many RhythmTypes through MusicalCharacteristicsRhythmTypes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(RhythmTypes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<RhythmTypes>,
  ): Promise<RhythmTypes[]> {
    return this.musicalCharacteristicsRepository.rhythmTypes(id).find(filter);
  }

  @post('/musical-characteristics/{id}/rhythm-types', {
    responses: {
      '200': {
        description: 'create a RhythmTypes model instance',
        content: {'application/json': {schema: getModelSchemaRef(RhythmTypes)}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async create(
    @param.path.number('id') id: typeof MusicalCharacteristics.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RhythmTypes, {
            title: 'NewRhythmTypesInMusicalCharacteristics',
            exclude: ['id'],
          }),
        },
      },
    }) rhythmTypes: Omit<RhythmTypes, 'id'>,
  ): Promise<RhythmTypes> {
    return this.musicalCharacteristicsRepository.rhythmTypes(id).create(rhythmTypes);
  }

  @patch('/musical-characteristics/{id}/rhythm-types', {
    responses: {
      '200': {
        description: 'MusicalCharacteristics.RhythmTypes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RhythmTypes, {partial: true}),
        },
      },
    })
    rhythmTypes: Partial<RhythmTypes>,
    @param.query.object('where', getWhereSchemaFor(RhythmTypes)) where?: Where<RhythmTypes>,
  ): Promise<Count> {
    return this.musicalCharacteristicsRepository.rhythmTypes(id).patch(rhythmTypes, where);
  }

  @del('/musical-characteristics/{id}/rhythm-types', {
    responses: {
      '200': {
        description: 'MusicalCharacteristics.RhythmTypes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(RhythmTypes)) where?: Where<RhythmTypes>,
  ): Promise<Count> {
    return this.musicalCharacteristicsRepository.rhythmTypes(id).delete(where);
  }
}
