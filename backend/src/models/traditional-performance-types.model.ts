import {Entity, model, property, hasMany} from '@loopback/repository';
import { TunePerformances } from './tune-performances.model';
import { Tunes } from './tunes.model';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'folk_tune', table: 'traditional_performance_types'}
  }
})
export class TraditionalPerformanceTypes extends Entity {
  @property({
    type: 'number',
    required: false,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    length: 100,
    postgresql: {columnName: 'title', dataType: 'character varying', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  title: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'description', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  description?: string;

  @property({
    type: 'boolean',
    required: true,
    postgresql: {columnName: 'is_active', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  isActive: boolean;

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

  @hasMany(() => Tunes, {
    through: {
      model: () => TunePerformances,
      keyFrom: 'traditionalPerformanceTypeId',
      keyTo: 'tunesId'
    }})
  tunes?: Tunes[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TraditionalPerformanceTypes>) {
    super(data);
  }
}

export interface TraditionalPerformanceTypesRelations {
  // describe navigational properties here
}

export type TraditionalPerformanceTypesWithRelations = TraditionalPerformanceTypes & TraditionalPerformanceTypesRelations;
