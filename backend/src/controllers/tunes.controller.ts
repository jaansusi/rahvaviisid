import {authenticate, AuthenticationBindings} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {basicAuthorization} from '../services';
import {
  Count,
  CountSchema,
  DefaultCrudRepository,
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
  del,
  requestBody,
} from '@loopback/rest';
import {
  ExternalReferences,
  MusicalCharacteristics,
  TuneEncodings,
  TunePerformances,
  TunePlaces,
  Tunes,
  TuneSongs,
  TunesPersonsRoles,
  TuneTranscriptions,
} from '../models';
import {
  ActualPerformanceTypesRepository,
  AuditLogRepository,
  ExternalReferencesRepository,
  MusicalCharacteristicsRepository,
  MusicalCharacteristicsRhythmTypesRepository,
  RhythmTypesRepository,
  SoundRangesRepository,
  TuneEncodingsRepository,
  TuneMelodiesRepository,
  TunePerformancesRepository,
  TunePlacesRepository,
  TuneSongsRepository,
  TunesPersonsRolesRepository,
  TunesRepository,
  TuneTranscriptionsRepository,
} from '../repositories';
import {AuditControllerMixin} from '../mixins';
import {IAuditMixinOptions, UserId} from '../types';
import {Getter, inject, MixinTarget} from '@loopback/core';
import { TunesFilter } from '../keys';

class TunesBaseController {
  constructor(
    @inject.getter(AuthenticationBindings.CURRENT_USER) 
    public getCurrentUser: Getter<UserId>,
    @repository.getter('AuditLogRepository') 
    public getAuditLogRepository: Getter<AuditLogRepository>, 
    @repository(AuditLogRepository)
    public auditLogRepository: AuditLogRepository,
    @repository(TunesRepository)
    public tunesRepository: TunesRepository,
    @repository(TuneMelodiesRepository)
    public tuneMelodiesRepository: TuneMelodiesRepository,
    @repository(TuneEncodingsRepository)
    public tuneEncodingsRepository: TuneEncodingsRepository,
    @repository(TuneSongsRepository)
    public tuneSongsRepository: TuneSongsRepository,
    @repository(TunePerformancesRepository)
    public tunePerformancesRepository: TunePerformancesRepository,
    @repository(TunePlacesRepository)
    public tunePlacesRepository: TunePlacesRepository,
    @repository(TuneTranscriptionsRepository)
    public tuneTranscriptionsRepository: TuneTranscriptionsRepository,
    @repository(TunesPersonsRolesRepository)
    public tunesPersonsRolesRepository: TunesPersonsRolesRepository,
    @repository(ActualPerformanceTypesRepository)
    public actualPerformanceTypesRepository: ActualPerformanceTypesRepository,
    @repository(MusicalCharacteristicsRepository)
    public musicalCharacteristicsRepository: MusicalCharacteristicsRepository,
    @repository(RhythmTypesRepository)
    public rhythmTypesRepository: RhythmTypesRepository,
    @repository(MusicalCharacteristicsRhythmTypesRepository)
    public musicalCharacteristicsRhythmTypesRepository: MusicalCharacteristicsRhythmTypesRepository,
    @repository(SoundRangesRepository)
    public soundRangesRepository: SoundRangesRepository,
    @repository(ExternalReferencesRepository)
    public externalReferencesRepository: ExternalReferencesRepository,
  ) {}

  @post('/tunes', {
    responses: {
      '200': {
        description: 'Tunes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tunes)}},
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
          schema: getModelSchemaRef(Tunes, {
            includeRelations: true,
            partial: 'deep',
            title: 'NewTunes',
            exclude: ['id'],
          }),
        },
      },
    })
    tunes: Omit<Tunes, 'id'>,
  ): Promise<Tunes> {
    return this.insertTune(tunes);
  }

  @get('/tunes/count', {
    responses: {
      '200': {
        description: 'Tunes model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Tunes) where?: Where<Tunes>): Promise<Count> {
    return this.tunesRepository.count(where);
  }

  @get('/tunes', {
    responses: {
      '200': {
        description: 'Array of Tunes model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Tunes, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Tunes) filter?: Filter<Tunes>): Promise<Tunes[]> {
    return this.tunesRepository.find(filter);
  }

  @get('/tunes/{id}', {
    responses: {
      '200': {
        description: 'Tunes model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Tunes, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Tunes, {exclude: 'where'})
    filter?: FilterExcludingWhere<Tunes>,
  ): Promise<Tunes> {
    return this.tunesRepository.findById(id, filter);
  }

  @patch('/tunes/{id}', {
    responses: {
      '204': {
        description: 'Tunes PATCH success',
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
          schema: getModelSchemaRef(Tunes, {
            includeRelations: true,
            partial: 'deep',
          }),
        },
      },
    })
    tunes: Tunes,
  ): Promise<void> {
    this.insertTune(tunes);
  }

  @del('/tunes/{id}', {
    responses: {
      '204': {
        description: 'Tunes DELETE success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'editor'],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tunesRepository.deleteById(id);
  }

  private async insertTune(tune: Tunes | Omit<Tunes, 'id'>): Promise<Tunes> {
    //We need the tune created first, but for that, it can't have any nested "navigational" objects in it
    //so let's just assign them to variables for later use
    let externalReferences = tune.externalReferences;
    delete tune.externalReferences;
    let musicalCharacteristics = tune.musicalCharacteristics;
    delete tune.musicalCharacteristics;
    let tuneTranscriptions = tune.tuneTranscriptions;
    delete tune.tuneTranscriptions;
    let tuneEncodings = tune.tuneEncodings;
    delete tune.tuneEncodings;
    let tunesPersonsRoles = tune.tunesPersonsRoles;
    delete tune.tunesPersonsRoles;
    let tuneSongs = tune.tuneSongs;
    delete tune.tuneSongs;
    let tunePlaces = tune.tunePlaces;
    delete tune.tunePlaces;
    let tunePerformances = tune.tunePerformances;
    delete tune.tunePerformances;

    //First we need the actual tune so we can link through it's ID
    let createdTune = await this.insertNestedAsset(tune, this.tunesRepository);

    //Add external tunes
    if (externalReferences !== undefined) {
      externalReferences.forEach((externalReference: ExternalReferences) => {
        this.insertNestedAsset(
          externalReference,
          this.externalReferencesRepository,
          createdTune.id,
        );
      });
    }

    if (musicalCharacteristics !== undefined) {
      //Create musical characteristics, we will need the ids
      musicalCharacteristics.forEach(
        (musicalCharacteristic: MusicalCharacteristics) => {
          delete musicalCharacteristic.soundRanges;
          this.insertNestedAsset(
            musicalCharacteristic,
            this.musicalCharacteristicsRepository,
            createdTune.id,
          ).then(newMusicalCharacteristic => {
            musicalCharacteristic.rhythmTypes?.forEach(rhythmType => {
              this.musicalCharacteristicsRepository
                .rhythmTypes(newMusicalCharacteristic.id)
                .create(rhythmType);
            });
          });
        },
      );
    }

    if (tuneTranscriptions !== undefined) {
      tuneTranscriptions.map((tuneTranscription: TuneTranscriptions) => {
        return this.insertNestedAsset(
          tuneTranscription,
          this.tuneTranscriptionsRepository,
          createdTune.id,
        );
      });
    }

    if (tuneEncodings !== undefined) {
      tuneEncodings.forEach((tuneEncoding: TuneEncodings) => {
        delete tuneEncoding.keySignatures;
        delete tuneEncoding.supportSounds;
        delete tuneEncoding.pitches;
        delete tuneEncoding.measures;
        let tuneMelodies = tuneEncoding.tuneMelodies;
        delete tuneEncoding.tuneMelodies;
        this.insertNestedAsset(
          tuneEncoding,
          this.tuneEncodingsRepository,
          createdTune.id,
        ).then(createdEncoding => {
          tuneMelodies?.forEach(tuneMelody => {
            this.insertNestedAsset(
              tuneMelody,
              this.tuneMelodiesRepository,
              createdEncoding.id,
            );
          });
        });
      });
    }

    if (tunesPersonsRoles !== undefined) {
      tunesPersonsRoles.forEach((tunesPersonsRole: TunesPersonsRoles) => {
        delete tunesPersonsRole.persons;
        delete tunesPersonsRole.tunePersonRoleTypes;
        this.insertNestedAsset(
          tunesPersonsRole,
          this.tunesPersonsRolesRepository,
          createdTune.id,
        );
      });
    }

    if (tuneSongs !== undefined) {
      tuneSongs.forEach((tuneSong: TuneSongs) => {
        this.insertNestedAsset(
          tuneSong,
          this.tuneSongsRepository,
          createdTune.id,
        );
      });
    }

    if (tunePlaces !== undefined) {
      tunePlaces.forEach((tunePlace: TunePlaces) => {
        delete tunePlace.persons;
        delete tunePlace.tunePlaceTypes;
        delete tunePlace.parishes;
        delete tunePlace.municipalities;
        delete tunePlace.villages;
        this.insertNestedAsset(
          tunePlace,
          this.tunePlacesRepository,
          createdTune.id,
        );
      });
    }

    if (tunePerformances !== undefined) {
      tunePerformances.forEach((tunePerformance: TunePerformances) => {
        delete tunePerformance.actualPerformanceTypes;
        delete tunePerformance.traditionalPerformanceTypes;
        delete tunePerformance.actualActionTypes;
        this.insertNestedAsset(
          tunePerformance,
          this.tunePerformancesRepository,
          createdTune.id,
        );
      });
    }

    return createdTune;
  }

  private async insertNestedAsset(
    asset: any,
    repository: DefaultCrudRepository<any, number, object>,
    externalId?: number,
    externalIdName: string = 'tunesId',
  ): Promise<any> {
    if (asset === undefined) return undefined;
    //If we already know the id then it's just a matter of updating the entry
    if (asset.id) {
      repository.updateById(asset.id, asset);
      return asset;
    }
    //If not, set the id of the referenced object (probably tune)
    if (externalId) asset[externalIdName] = externalId;

    //And create a new entry into the db
    return repository.create(asset);
  }
}

const groupAuditOpts: IAuditMixinOptions = {
  actionKey: 'Tunes_Logs',
  queryIncludeFilter: TunesFilter.TUNES_INCLUDE_ALL_FILTER
};
export class TunesController extends AuditControllerMixin<
  Tunes,
  MixinTarget<TunesBaseController>
>(TunesBaseController, groupAuditOpts) {
  constructor(
    @inject.getter(AuthenticationBindings.CURRENT_USER) public getCurrentUser: Getter<UserId>,
    @repository.getter('AuditLogRepository') public getAuditLogRepository: Getter<AuditLogRepository>, 
    @repository(AuditLogRepository)
    public auditLogRepository: AuditLogRepository,
    @repository(TunesRepository)
    public tunesRepository: TunesRepository,
    @repository(TuneMelodiesRepository)
    public tuneMelodiesRepository: TuneMelodiesRepository,
    @repository(TuneEncodingsRepository)
    public tuneEncodingsRepository: TuneEncodingsRepository,
    @repository(TuneSongsRepository)
    public tuneSongsRepository: TuneSongsRepository,
    @repository(TunePerformancesRepository)
    public tunePerformancesRepository: TunePerformancesRepository,
    @repository(TunePlacesRepository)
    public tunePlacesRepository: TunePlacesRepository,
    @repository(TuneTranscriptionsRepository)
    public tuneTranscriptionsRepository: TuneTranscriptionsRepository,
    @repository(TunesPersonsRolesRepository)
    public tunesPersonsRolesRepository: TunesPersonsRolesRepository,
    @repository(ActualPerformanceTypesRepository)
    public actualPerformanceTypesRepository: ActualPerformanceTypesRepository,
    @repository(MusicalCharacteristicsRepository)
    public musicalCharacteristicsRepository: MusicalCharacteristicsRepository,
    @repository(RhythmTypesRepository)
    public rhythmTypesRepository: RhythmTypesRepository,
    @repository(MusicalCharacteristicsRhythmTypesRepository)
    public musicalCharacteristicsRhythmTypesRepository: MusicalCharacteristicsRhythmTypesRepository,
    @repository(SoundRangesRepository)
    public soundRangesRepository: SoundRangesRepository,
    @repository(ExternalReferencesRepository)
    public externalReferencesRepository: ExternalReferencesRepository,
  ) {
    super();
  }
}
