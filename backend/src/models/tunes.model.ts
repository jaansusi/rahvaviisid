import {Entity, hasMany, model, property, hasOne} from '@loopback/repository';
import { TuneMelodies } from './tune-melodies.model';
import { TuneTranscriptions } from './tune-transcriptions.model';
import {Countries} from './countries.model';
import {Nations} from './nations.model';
import {Languages} from './languages.model';
import {TunePerformances} from './tune-performances.model';
import {TunePlaces} from './tune-places.model';
import {TunesPersonsRoles} from './tunes-persons-roles.model';
import {TuneSongs} from './tune-songs.model';
import {TuneEncodings} from './tune-encodings.model';

@model({
  settings: {idInjection: false, postgresql: {schema: 'folk_tune', table: 'tunes'}}
})
export class Tunes extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'tune_state_id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  tuneStateId: number;

  @property({
    type: 'string',
    length: 60,
    postgresql: {columnName: 'tune_reference', dataType: 'character varying', dataLength: 60, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  tuneReference?: string;

  @property({
    type: 'string',
    length: 60,
    postgresql: {columnName: 'text_reference', dataType: 'character varying', dataLength: 60, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  textReference?: string;

  @property({
    type: 'string',
    length: 60,
    postgresql: {columnName: 'sound_reference', dataType: 'character varying', dataLength: 60, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  soundReference?: string;

  @property({
    type: 'string',
    length: 60,
    postgresql: {columnName: 'video_reference', dataType: 'character varying', dataLength: 60, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  videoReference?: string;

  @property({
    type: 'string',
    length: 60,
    postgresql: {columnName: 'catalogue', dataType: 'character varying', dataLength: 60, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  catalogue?: string;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'nation_id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  nationId: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'language_id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  languageId: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'country_id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  countryId: number;

  @property({
    type: 'string',
    postgresql: {columnName: 'publications', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  publications?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'remarks', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  remarks?: string;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'verified_by', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  verifiedBy?: number;

  @property({
    type: 'date',
    postgresql: {columnName: 'verified', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  verified?: string;

  @property({
    type: 'date',
    required: true,
    postgresql: {columnName: 'created', dataType: 'timestamp without time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  created: string;

  @property({
    type: 'date',
    required: true,
    postgresql: {columnName: 'modified', dataType: 'timestamp without time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  modified: string;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'rhythm_type_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  rhythmTypeId?: number;

  @property({
    type: 'string',
    postgresql: {columnName: 'clef', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  clef?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'support_sound', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  supportSound?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'height', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  height?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'bar', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  bar?: string;

  @hasMany(() => TuneMelodies, { keyTo: 'tune_id'})
  tuneMelodies?: TuneMelodies[];


  @hasMany(() => TuneTranscriptions, { keyFrom: 'tune_id'})
  tuneTranscriptions?: TuneTranscriptions[];

  @hasOne(() => Countries, { keyFrom: 'countryId', keyTo: 'id'})
  countries: Countries;

  @hasOne(() => Nations, { keyFrom: 'nationId', keyTo: 'id'})
  nations: Nations;

  @hasOne(() => Languages, { keyFrom: 'languageId', keyTo: 'id'})
  languages: Languages;
  //esitlus
  @hasMany(() => TunePerformances, {keyTo: 'id'})
  tunePerformances: TunePerformances[];
  //kohad
  @hasMany(() => TunePlaces, {keyTo: 'id'})
  tunePlaces: TunePlaces[];
  //Laul
  @hasMany(() => TuneSongs, {keyTo: 'id'})
  tuneSongs: TuneSongs[];
  //muusikalised tunnused
  @hasMany(() => TuneEncodings, {keyTo: 'id'})
  tuneEncodings: TuneEncodings[];
  //esitaja
  @hasMany(() => TunesPersonsRoles, {keyTo: 'id'})
  tunesPersonsRoles: TunesPersonsRoles[];


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
