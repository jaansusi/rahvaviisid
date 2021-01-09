import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'folk_tune', table: 'persons'}}
})
export class Persons extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'string',
    length: 40,
    postgresql: {columnName: 'pid', dataType: 'character varying', dataLength: 40, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  pid?: string;

  @property({
    type: 'string',
    length: 1000,
    postgresql: {columnName: 'given_name', dataType: 'character varying', dataLength: 1000, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  givenName?: string;

  @property({
    type: 'string',
    length: 1000,
    postgresql: {columnName: 'surname', dataType: 'character varying', dataLength: 1000, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  surname?: string;

  @property({
    type: 'string',
    length: 1000,
    postgresql: {columnName: 'nickname', dataType: 'character varying', dataLength: 1000, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  nickname?: string;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'birth_year', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  birthYear?: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'death_year', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  deathYear?: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'sex_id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  sexId: number;

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

  constructor(data?: Partial<Persons>) {
    super(data);
  }
}

export interface PersonsRelations {
  // describe navigational properties here
}

export type PersonsWithRelations = Persons & PersonsRelations;
