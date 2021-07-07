import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false, 
    postgresql: {schema: 'folk_tune', table: 'tune_melodies'}}
})
export class TuneMelodies extends Entity {
  @property({
    type: 'number',
    required: false,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'melody', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  melody: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'alter', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  alter?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'tempo', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  tempo?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'note_length', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  noteLength?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'title', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  title?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'author', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  author?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'reference', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  reference?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'custom_input', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  customInput?: string;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'tune_encodings_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  tuneEncodingsId: number;

  @property({
    type: 'string',
    postgresql: {columnName: 'words', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  words?: string;

  @property({
    type: 'number',
    scale: 0,
    jsonSchema: {nullable: true},
    postgresql: {columnName: 'variation_index', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  variationIndex?: number;

  @property({
    type: 'string',
    scale: 0,
    postgresql: {columnName: 'rhythm_type', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  rhythmType?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TuneMelodies>) {
    super(data);
  }
}

export interface TuneMelodiesRelations {
  // describe navigational properties here
}

export type TuneMelodiesWithRelations = TuneMelodies & TuneMelodiesRelations;
