import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'folk_tune', table: 'tune_encodings'}}
})
export class TuneEncodings extends Entity {
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
    postgresql: {columnName: 'tune_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  tuneId: number;

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
