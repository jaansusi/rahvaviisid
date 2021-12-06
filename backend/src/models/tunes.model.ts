import {Entity, hasMany, model, property, hasOne} from '@loopback/repository';
import {TuneMelodies} from './tune-melodies.model';
import {TuneTranscriptions} from './tune-transcriptions.model';
import {Countries} from './countries.model';
import {Nations} from './nations.model';
import {Languages} from './languages.model';
import {TunePerformances} from './tune-performances.model';
import {TunePlaces} from './tune-places.model';
import {TunesPersonsRoles} from './tunes-persons-roles.model';
import {TuneSongs} from './tune-songs.model';
import {TuneEncodings} from './tune-encodings.model';
import {ExternalReferences} from './external-references.model';
import {MusicalCharacteristics} from './musical-characteristics.model';
import {Users} from './users.model';
import {TuneStates} from './tune-states.model';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'folk_tune', table: 'tunes'},
  },
})
export class Tunes extends Entity {
  @property({
    type: 'number',
    required: false,
    scale: 0,
    id: 1,
    postgresql: {
      columnName: 'id',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  id: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {
      columnName: 'tune_state_id',
      dataType: 'smallint',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  tuneStateId: number;

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 60,
    },
    postgresql: {
      columnName: 'tune_reference',
      dataType: 'character varying',
      dataLength: 60,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  tuneReference?: string;

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 60,
    },
    postgresql: {
      columnName: 'text_reference',
      dataType: 'character varying',
      dataLength: 60,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  textReference?: string;

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 60,
    },
    postgresql: {
      columnName: 'sound_reference',
      dataType: 'character varying',
      dataLength: 60,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  soundReference?: string;

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 60,
    },
    postgresql: {
      columnName: 'video_reference',
      dataType: 'character varying',
      dataLength: 60,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  videoReference?: string;

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 60,
    },
    postgresql: {
      columnName: 'catalogue',
      dataType: 'character varying',
      dataLength: 60,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  catalogue?: string;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {
      columnName: 'nation_id',
      dataType: 'smallint',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  nationId: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {
      columnName: 'language_id',
      dataType: 'smallint',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  languageId: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {
      columnName: 'country_id',
      dataType: 'smallint',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  countryId: number;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'publications',
      dataType: 'text',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  publications?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'remarks',
      dataType: 'text',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  remarks?: string;

  @property({
    type: 'string',
    required: false,
    postgresql: {
      columnName: 'verified_by',
      dataType: 'uuid',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  verifiedBy?: string;

  @property({
    type: 'string',
    required: false,
    jsonSchema: {nullable: true},
    postgresql: {
      columnName: 'verified',
      dataType: 'date',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  verified?: string;

  @property({
    type: 'string',
    required: false,
    postgresql: {
      columnName: 'created',
      dataType: 'timestamp without time zone',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  created: string;

  @property({
    type: 'string',
    required: false,
    postgresql: {
      columnName: 'modified',
      dataType: 'timestamp without time zone',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  modified: string;

  @property({
    type: 'number',
    scale: 0,
    jsonSchema: {nullable: true},
    postgresql: {
      columnName: 'rhythm_type_id',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'YES',
    },
  })
  rhythmTypeId?: number;

  @hasOne(() => TuneStates, {keyFrom: 'tuneStateId', keyTo: 'id'})
  tuneStates: TuneStates;

  @hasMany(() => TuneTranscriptions, {keyTo: 'tune_id'})
  tuneTranscriptions?: TuneTranscriptions[];

  @hasOne(() => Countries, {keyFrom: 'countryId', keyTo: 'id'})
  countries: Countries;

  @hasOne(() => Nations, {keyFrom: 'nationId', keyTo: 'id'})
  nations: Nations;

  @hasOne(() => Users, {keyFrom: 'verifiedBy', keyTo: 'id'})
  users: Users;

  @hasOne(() => Languages, {keyFrom: 'languageId', keyTo: 'id'})
  languages: Languages;

  //esitlus
  @hasMany(() => TunePerformances, {keyTo: 'tune_id'})
  tunePerformances?: TunePerformances[];

  //kohad
  @hasMany(() => TunePlaces, {keyTo: 'tune_id'})
  tunePlaces?: TunePlaces[];

  //Laul
  @hasMany(() => TuneSongs, {keyTo: 'tune_id'})
  tuneSongs?: TuneSongs[];

  //muusikalised tunnused
  @hasMany(() => MusicalCharacteristics)
  musicalCharacteristics?: MusicalCharacteristics[];

  //kodeeringud
  @hasMany(() => TuneEncodings, {keyTo: 'tune_id'})
  tuneEncodings?: TuneEncodings[];

  //esitaja
  @hasMany(() => TunesPersonsRoles, {keyTo: 'tune_id'})
  tunesPersonsRoles?: TunesPersonsRoles[];

  //pid
  @hasMany(() => ExternalReferences, {keyTo: 'tune_id'})
  externalReferences?: ExternalReferences[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Tunes>) {
    super(data);
  }
}

export interface TunesRelations {
  // describe navigational properties here
}

export type TunesWithRelations = Tunes & TunesRelations;
