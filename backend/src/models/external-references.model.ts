import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'folk_tune', table: 'external_references'}
  }
})
export class ExternalReferences extends Entity {
  @property({
    type: 'number',
    required: false,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'number',
    required: false,
    scale: 0,
    postgresql: {columnName: 'tune_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  tunesId?: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'type_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  typeId: number;

  @property({
    type: 'string',
    postgresql: {columnName: 'description', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  description?: string;

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 1000
    },
    postgresql: {columnName: 'value', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  value?: string;

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

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ExternalReferences>) {
    super(data);
  }
}

export interface ExternalReferencesRelations {
  // describe navigational properties here
}

export type ExternalReferencesWithRelations = ExternalReferences & ExternalReferencesRelations;
