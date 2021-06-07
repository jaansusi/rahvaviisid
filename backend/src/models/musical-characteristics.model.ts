import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {RhythmTypes} from './rhythm-types.model';
import {MusicalCharacteristicsRhythmTypes} from './musical-characteristics-rhythm-types.model';
import {SoundRanges} from './sound-ranges.model';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'folk_tune', table: 'musical_characteristics'}
  }
})
export class MusicalCharacteristics extends Entity {
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
    postgresql: {columnName: 'sound_range_id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  soundRangeId: number;

  @property({
    type: 'string',
    length: 40,
    postgresql: {columnName: 'melostrophe_num_score', dataType: 'character varying', dataLength: 40, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  melostropheNumScore?: string;

  @property({
    type: 'string',
    length: 40,
    postgresql: {columnName: 'melostrophe_num_audio', dataType: 'character varying', dataLength: 40, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  melostropheNumAudio?: string;

  @property({
    type: 'boolean',
    required: true,
    postgresql: {columnName: 'is_variable', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  isVariable: boolean;

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

  @hasMany(() => RhythmTypes, {through: {model: () => MusicalCharacteristicsRhythmTypes}})
  rhythmTypes: RhythmTypes[];

  @hasOne(() => SoundRanges, {keyFrom: 'soundRangeId', keyTo: 'Id'})
  soundRanges: SoundRanges;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<MusicalCharacteristics>) {
    super(data);
  }
}

export interface MusicalCharacteristicsRelations {
  // describe navigational properties here
}

export type MusicalCharacteristicsWithRelations = MusicalCharacteristics & MusicalCharacteristicsRelations;
