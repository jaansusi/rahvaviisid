import {Entity, model, property, hasOne} from '@loopback/repository';
import {Persons} from './persons.model';
import {TranscriptionPersonRoleTypes} from './transcription-person-role-types.model';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'folk_tune', table: 'transcriptions_persons_roles'}
  }
})
export class TranscriptionsPersonsRoles extends Entity {
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
    postgresql: {columnName: 'tune_transcription_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  tuneTranscriptionsId: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'person_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  personId: number;
  
  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'transcription_person_role_type_id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  transcriptionPersonRoleTypeId: number;

  @property({
    type: 'number',
    scale: 0,
    jsonSchema: {nullable: true},
    postgresql: {columnName: 'action_year', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  actionYear?: number;

  @property({
    type: 'number',
    scale: 0,
    jsonSchema: {nullable: true},
    postgresql: {columnName: 'action_start_year', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  actionStartYear?: number;

  @property({
    type: 'number',
    scale: 0,
    jsonSchema: {nullable: true},
    postgresql: {columnName: 'action_end_year', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  actionEndYear?: number;

  @property({
    type: 'string',
    postgresql: {columnName: 'name_origin', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  nameOrigin?: string;

  @property({
    type: 'string',
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

  @hasOne(() => Persons, {keyFrom: 'personId', keyTo: 'id'})
  persons: Persons;

  @hasOne(() => TranscriptionPersonRoleTypes, {keyFrom: 'transcriptionPersonRoleTypeId', keyTo: 'id'})
  transcriptionPersonRoleTypes: TranscriptionPersonRoleTypes;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TranscriptionsPersonsRoles>) {
    super(data);
  }
}

export interface TranscriptionsPersonsRolesRelations {
  // describe navigational properties here
}

export type TranscriptionsPersonsRolesWithRelations = TranscriptionsPersonsRoles & TranscriptionsPersonsRolesRelations;
