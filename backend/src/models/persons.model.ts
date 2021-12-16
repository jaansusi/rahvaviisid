import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {Sexes} from './sexes.model';
import {Tunes} from './tunes.model';
import {TunesPersonsRoles} from './tunes-persons-roles.model'

@model({
  settings: {idInjection: false, postgresql: {schema: 'folk_tune', table: 'persons'}}
})
export class Persons extends Entity {
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
    jsonSchema: {
      minLength: 0,
      maxLength: 40,
      nullable: true,
    },
    postgresql: {columnName: 'pid', dataType: 'character varying', dataLength: 40, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  pid?: string;

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 1000,
      nullable: true
    },
    postgresql: {columnName: 'given_name', dataType: 'character varying', dataLength: 1000, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  givenName?: string;

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 1000,
      nullable: true
    },
    postgresql: {columnName: 'surname', dataType: 'character varying', dataLength: 1000, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  surname?: string;

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 1000,
      nullable: true
    },
    postgresql: {columnName: 'nickname', dataType: 'character varying', dataLength: 1000, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  nickname?: string;

  @property({
    type: 'number',
    scale: 0,
    jsonSchema: {nullable: true},
    postgresql: {columnName: 'birth_year', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  birthYear?: number;

  @property({
    type: 'number',
    scale: 0,
    jsonSchema: {nullable: true},
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
    jsonSchema: {nullable: true},
    postgresql: {columnName: 'remarks', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  remarks?: string;

  @property({
    type: 'string',
    required: false,
    postgresql: {columnName: 'created', dataType: 'timestamp without time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  created: string;

  @property({
    type: 'string',
    required: false,
    postgresql: {columnName: 'modified', dataType: 'timestamp without time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  modified: string;

  @hasOne(() => Sexes, { keyFrom: 'sexId', keyTo: 'id'})
  sexes: Sexes;

  @hasMany(() => Tunes, {
    through: {
      model: () => TunesPersonsRoles,
      keyFrom: 'personId',
      keyTo: 'tunesId'
    }})
  tunes?: Tunes[];

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
