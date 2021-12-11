import {authenticate, AuthenticationBindings} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {basicAuthorization} from '../services';
import {
  Count,
  CountSchema,
  DefaultCrudRepository,
  Entity,
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
  MusicalCharacteristicsTextFormsRepository,
  MusicalCharacteristicsTuneFormsRepository,
  RhythmTypesRepository,
  SoundRangesRepository,
  TuneEncodingsRepository,
  TuneMelodiesRepository,
  TunePerformancesRepository,
  TunePlacesRepository,
  TuneSongsRepository,
  TuneSongsSongGenresRepository,
  TuneSongsSongTopicsRepository,
  TuneSongsTuneGenresRepository,
  TuneSongsVerseFormsRepository,
  TunesPersonsRolesRepository,
  TunesRepository,
  TuneTranscriptionsRepository,
} from '../repositories';
import {IAuditMixinOptions, UserId} from '../types';
import {Getter, inject} from '@loopback/core';
import {TunesFilter} from '../keys';
import {AuditBaseController} from './auditbase.controller';
import {ValidationError} from '../errors';

const groupAuditOpts: IAuditMixinOptions = {
  actionKey: 'Tunes_Logs',
};

import {UniqueValidationInterceptor} from '../interceptors';
import {intercept} from '@loopback/core';

@intercept(UniqueValidationInterceptor.BINDING_KEY)
export class TunesController extends AuditBaseController<Tunes> {
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
    @repository(TuneSongsSongGenresRepository)
    public tuneSongsSongGenresRepository: TuneSongsSongGenresRepository,
    @repository(TuneSongsTuneGenresRepository)
    public tuneSongsTuneGenresRepository: TuneSongsTuneGenresRepository,
    @repository(TuneSongsSongTopicsRepository)
    public tuneSongsSongTopicsRepository: TuneSongsSongTopicsRepository,
    @repository(TuneSongsVerseFormsRepository)
    public tuneSongsVerseFormsRepository: TuneSongsVerseFormsRepository,
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
    @repository(MusicalCharacteristicsTextFormsRepository)
    public musicalCharacteristicsTextFormsRepository: MusicalCharacteristicsTextFormsRepository,
    @repository(MusicalCharacteristicsTuneFormsRepository)
    public musicalCharacteristicsTuneFormsRepository: MusicalCharacteristicsTuneFormsRepository,
    @repository(SoundRangesRepository)
    public soundRangesRepository: SoundRangesRepository,
    @repository(ExternalReferencesRepository)
    public externalReferencesRepository: ExternalReferencesRepository,
  ) {
    super(groupAuditOpts);
  }

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
    let created = await this.insertTune(tunes);
    super.auditCreate(created);
    return created;
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
    let before = await this.tunesRepository.findById(
      id,
      TunesFilter.ALL_NO_CLASSIFICATORS,
    );

    await this.insertTune(tunes, before);
    let after = await this.tunesRepository.findById(
      id,
      TunesFilter.ALL_NO_CLASSIFICATORS,
    );
    super.auditUpdate(before, after);
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
    let before = await this.tunesRepository.findById(
      id,
      TunesFilter.ALL_NO_CLASSIFICATORS,
    );
    await this.tunesRepository.deleteById(id);
    super.auditDelete(before);
  }

  private async insertTune(
    tune: Tunes | Omit<Tunes, 'id'>,
    original?: Tunes,
  ): Promise<Tunes> {
    if (!(tune.tuneReference || tune.soundReference || tune.videoReference)) {
      let err: ValidationError = new ValidationError(
        'validation.tunes.invalidReferences',
      );
      err.statusCode = 422;
      throw err;
    }

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

    delete tune.tuneStates;

    //First we need the actual tune so we can link through it's ID
    let createdTune = await this.insertNestedAsset(tune, this.tunesRepository);

    //Add external tunes
    if (original?.externalReferences)
      this.deleteNestedAssets(
        original.externalReferences,
        externalReferences,
        this.externalReferencesRepository,
      );
    externalReferences?.forEach((externalReference: ExternalReferences) => {
      this.insertNestedAsset(
        externalReference,
        this.externalReferencesRepository,
        createdTune.id,
      );
    });

    if (musicalCharacteristics !== undefined) {
      //Create musical characteristics, we will need the ids
      musicalCharacteristics.forEach(
        (musicalCharacteristic: MusicalCharacteristics) => {
          delete musicalCharacteristic.soundRanges;
          let textForms = musicalCharacteristic.textForms;
          delete musicalCharacteristic.textForms;
          let tuneForms = musicalCharacteristic.tuneForms;
          delete musicalCharacteristic.tuneForms;
          let rhythmTypes = musicalCharacteristic.rhythmTypes;
          delete musicalCharacteristic.rhythmTypes;
          this.insertNestedAsset(
            musicalCharacteristic,
            this.musicalCharacteristicsRepository,
            createdTune.id,
          ).then((tempMusicCharac) => {
            this.createM2mRelations(
              textForms,
              tempMusicCharac.id,
              'musicalCharacteristicId',
              'textFormId',
              this.musicalCharacteristicsTextFormsRepository,
            );
            this.createM2mRelations(
              tuneForms,
              tempMusicCharac.id,
              'musicalCharacteristicId',
              'tuneFormId',
              this.musicalCharacteristicsTuneFormsRepository,
            );
            this.createM2mRelations(
              rhythmTypes,
              tempMusicCharac.id,
              'musicalCharacteristicsId',
              'rhythmTypesId',
              this.musicalCharacteristicsRhythmTypesRepository,
            );
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
        let tuneGenres = tuneSong.tuneGenres;
        delete tuneSong.tuneGenres;
        let songGenres = tuneSong.songGenres;
        delete tuneSong.songGenres;
        let songTopics = tuneSong.songTopics;
        delete tuneSong.songTopics;
        let verseForms = tuneSong.verseForms;
        delete tuneSong.verseForms;
        this.insertNestedAsset(
          tuneSong,
          this.tuneSongsRepository,
          createdTune.id,
        ).then((insertedAsset) => {
          this.createM2mRelations(
            tuneGenres,
            insertedAsset.id,
            'tuneSongId',
            'tuneGenreId',
            this.tuneSongsTuneGenresRepository,
          );
          this.createM2mRelations(
            songGenres,
            insertedAsset.id,
            'tuneSongId',
            'songGenreId',
            this.tuneSongsSongGenresRepository,
          );
          this.createM2mRelations(
            songTopics,
            insertedAsset.id,
            'tuneSongId',
            'songTopicId',
            this.tuneSongsSongTopicsRepository,
          );
          this.createM2mRelations(
            verseForms,
            insertedAsset.id,
            'tuneSongId',
            'verseFormId',
            this.tuneSongsVerseFormsRepository,
          );
        });
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
      await repository.updateById(asset.id, asset);
      return asset;
    }
    //If not, set the id of the referenced object (probably tune)
    if (externalId) asset[externalIdName] = externalId;

    //And create a new entry into the db
    return await repository.create(asset);
  }
  
  private async createM2mRelations(
    assets: any[] | undefined,
    firstId: number,
    firstIdProperty: string,
    secondIdProperty: string,
    relationAssetRepository: DefaultCrudRepository<any, number, object>,
  ): Promise<any> {
    //to-do: delete should be selective, compare with originals and choose assets for deletion
    await relationAssetRepository.deleteAll({
      [firstIdProperty]: firstId
    });
    assets?.forEach(asset => {
      let relationAsset = {
        [firstIdProperty]: firstId,
        [secondIdProperty]: asset.id,
      }
      let filter = {
        where: relationAsset,
      };
      relationAssetRepository.findOne(filter).then(existing => {
        if (existing === null)
          relationAssetRepository.create(relationAsset);
      });
    });
  }

  private async deleteNestedAssets(
    originals: Entity[],
    current: Entity[],
    repo: DefaultCrudRepository<any, number>,
  ) {
    let toBeDeleted = originals.filter(
      x =>
        !current
          //The typeof here is necessary, sometimes getId is not defined as a function..
          ?.map(y => (typeof y['getId'] === 'function' ? y.getId() : undefined))
          .includes(x.getId()),
    );
    toBeDeleted?.forEach(x => repo.deleteById(x.getId()));
  }
}
