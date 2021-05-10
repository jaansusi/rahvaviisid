import { User as OrigUser } from '@loopback/authentication-jwt';
import {Entity, hasOne, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'public', table: 'user'}}
})
export class User extends OrigUser {
  @property.array(String, {
    postgresql: {columnName: 'roles', dataType: 'varchar[]', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
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

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
