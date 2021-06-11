import {Entity, hasMany, model, property, hasOne} from '@loopback/repository';
import { TuneMelodies } from './tune-melodies.model';
import {TranscriptionSources} from './transcription-sources.model';
import {TranscriptionsPersonsRoles} from './transcriptions-persons-roles.model';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'folk_tune', table: 'tune_transcriptions'}
  }
})
export class TuneTranscriptions extends Entity {
  @property({
    type: 'number',
    required: false,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'tune_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  tunesId: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'transcription_source_id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  transcriptionSourceId: number;

  @property({
    type: 'string',
    postgresql: {columnName: 'file_reference', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  fileReference?: string;

  @property({
    type: 'date',
    required: false,
    postgresql: {columnName: 'created', dataType: 'timestamp without time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  created: string;

  @property({
    type: 'date',
    required: false,
    postgresql: {columnName: 'modified', dataType: 'timestamp without time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  modified: string;

  
  @hasOne(() => TranscriptionSources, {keyFrom: 'transcriptionSourceId', keyTo: 'id'})
  transcriptionSources: TranscriptionSources;

  @hasMany(() => TranscriptionsPersonsRoles)
  transcriptionsPersonsRoles: TranscriptionsPersonsRoles[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TuneTranscriptions>) {
    super(data);
  }
}

export interface TuneTranscriptionsRelations {
  // describe navigational properties here
}

export type TuneTranscriptionsWithRelations = TuneTranscriptions & TuneTranscriptionsRelations;
