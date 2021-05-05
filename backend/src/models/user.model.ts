import { User } from '@loopback/authentication-jwt';
import {Entity, hasOne, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'public', table: 'user'}}
})
export class EkmUser extends User {
  @property({
    type: 'string',
    postgresql: {columnName: 'roles', dataType: 'ARRAY', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  roles?: string[];

  @property({
    type: 'string',
    required: false,
    length: 40,
    postgresql: {columnName: 'firstname', dataType: 'character varying', dataLength: 40, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  firstName?: string;

  @property({
    type: 'string',
    required: false,
    length: 40,
    postgresql: {columnName: 'lastname', dataType: 'character varying', dataLength: 40, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  lastName?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<EkmUser>) {
    super(data);
  }
}

export interface EkmUserRelations {
  // describe navigational properties here
}

export type EkmUsersWithRelations = EkmUser & EkmUserRelations;
