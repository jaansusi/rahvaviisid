import {Entity, model, property} from '@loopback/repository';

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
