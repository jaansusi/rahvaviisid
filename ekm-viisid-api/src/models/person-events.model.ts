import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'folk_tune', table: 'person_events'}}
})
export class PersonEvents extends Entity {
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
    required: true,
    length: 100,
    postgresql: {columnName: 'event_object', dataType: 'character varying', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  eventObject: string;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'event_object_ident', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  eventObjectIdent: number;

  @property({
    type: 'string',
    required: true,
    length: 10,
    postgresql: {columnName: 'event_action', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  eventAction: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'description', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  description: string;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'user_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  userId: number;

  @property({
    type: 'date',
    required: true,
    postgresql: {columnName: 'created', dataType: 'timestamp without time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  created: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PersonEvents>) {
    super(data);
  }
}

export interface PersonEventsRelations {
  // describe navigational properties here
}

export type PersonEventsWithRelations = PersonEvents & PersonEventsRelations;
