import {Entity, model, property, hasOne} from '@loopback/repository';
import {ActualPerformanceTypes} from './actual-performance-types.model';
import {ActualActionTypes} from './actual-action-types.model';
import {TraditionalPerformanceTypes} from './traditional-performance-types.model';
import {TraditionalActionTypes} from './traditional-action-types.model';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'folk_tune', table: 'tune_performances'}
  }
})
export class TunePerformances extends Entity {
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
    postgresql: {columnName: 'actual_performance_type_id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  actualPerformanceTypeId?: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'traditional_performance_type_id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  traditionalPerformanceTypeId?: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'actual_action_type_id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  actualActionTypeId?: number;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'accompaniment', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  accompaniment?: string;

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

  @hasOne(() => ActualPerformanceTypes, {keyFrom: 'actualPerformanceTypeId?', keyTo: 'id'})
  actualPerformanceTypes?: ActualPerformanceTypes;

  @hasOne(() => ActualActionTypes, {keyFrom: 'actualActionTypeId', keyTo: 'id'})
  actualActionTypes?: ActualActionTypes;

  @hasOne(() => TraditionalPerformanceTypes, {keyFrom: 'traditionalPerformanceTypeId', keyTo: 'id'})
  traditionalPerformanceTypes?: TraditionalPerformanceTypes;


  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TunePerformances>) {
    super(data);
  }
}

export interface TunePerformancesRelations {
  // describe navigational properties here
}

export type TunePerformancesWithRelations = TunePerformances & TunePerformancesRelations;
