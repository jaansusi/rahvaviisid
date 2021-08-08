import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {Persons} from './persons.model';
import {TunePlaceTypes} from './tune-place-types.model';
import {Parishes} from './parishes.model';
import {Municipalities} from './municipalities.model';
import {Villages} from './villages.model';
import {Tunes} from './tunes.model';

@model({
  settings: {idInjection: false, postgresql: {schema: 'folk_tune', table: 'tune_places'}}
})
export class TunePlaces extends Entity {
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
    scale: 0,
    jsonSchema: {nullable: true},
    postgresql: {columnName: 'person_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  personId?: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    jsonSchema: {nullable: true},
    postgresql: {columnName: 'tune_place_type_id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  tunePlaceTypeId: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    jsonSchema: {nullable: true},
    postgresql: {columnName: 'parish_id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  parishId: number;

  @property({
    type: 'number',
    scale: 0,
    jsonSchema: {nullable: true},
    postgresql: {columnName: 'municipality_id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  municipalityId?: number;

  @property({
    type: 'number',
    scale: 0,
    jsonSchema: {nullable: true},
    postgresql: {columnName: 'village_id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  villageId?: number;

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 1000
    },
    postgresql: {columnName: 'other_place', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  otherPlace?: string;

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

  @hasOne(() => Persons, {keyFrom: 'personId', keyTo: 'id'})
  persons?: Persons;

  @hasOne(() => TunePlaceTypes, {keyFrom: 'tunePlaceTypeId', keyTo: 'id'})
  tunePlaceTypes?: TunePlaceTypes;

  @hasOne(() => Parishes, {keyFrom: 'parishId', keyTo: 'id'})
  parishes?: Parishes;

  @hasOne(() => Municipalities, {keyFrom: 'municipalityId', keyTo: 'id'})
  municipalities?: Municipalities;

  @hasOne(() => Villages, {keyFrom: 'villageId', keyTo: 'id'})
  villages?: Villages;

  @hasMany(() => Tunes, {keyFrom: 'tunesId', keyTo: 'id'})
  tunes: Tunes[];


  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TunePlaces>) {
    super(data);
  }
}

export interface TunePlacesRelations {
  // describe navigational properties here
}

export type TunePlacesWithRelations = TunePlaces & TunePlacesRelations;
