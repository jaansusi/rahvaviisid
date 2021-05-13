import {Entity, model, property, hasOne} from '@loopback/repository';
import {KeySignatures} from './key-signatures.model';
import {SupportSounds} from './support-sounds.model';
import {Measures} from './measures.model';
import {Pitches} from './pitches.model';

@model({
  settings: {idInjection: false, postgresql: {schema: 'folk_tune', table: 'tune_encodings'}}
})
export class TuneEncodings extends Entity {
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
    postgresql: {columnName: 'tune_encoding_num', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  tuneEncodingNum: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'key_signature_id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  keySignatureId?: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'support_sound_id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  supportSoundId?: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'pitch_id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  pitchId?: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'measure_id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  measureId?: number;

  @property({
    type: 'string',
    length: 40,
    postgresql: {columnName: 'tempo', dataType: 'character varying', dataLength: 40, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  tempo?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'remarks', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  remarks?: string;

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

  @hasOne(() => KeySignatures, {keyFrom: 'keySignatureId', keyTo: 'id'})
  keySignatures: KeySignatures;

  @hasOne(() => SupportSounds, {keyFrom: 'supportSoundId', keyTo: 'id'})
  supportSounds: SupportSounds;

  @hasOne(() => Pitches, {keyFrom: 'pitchId', keyTo: 'id'})
  pitches: Pitches;
  
  @hasOne(() => Measures, {keyFrom: 'measureId', keyTo: 'id'})
  measures: Measures;


  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TuneEncodings>) {
    super(data);
  }
}

export interface TuneEncodingsRelations {
  // describe navigational properties here
}

export type TuneEncodingsWithRelations = TuneEncodings & TuneEncodingsRelations;
