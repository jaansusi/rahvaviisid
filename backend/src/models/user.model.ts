import {Entity, hasOne, model, property} from '@loopback/repository';
import { User as OrigUser, UserCredentials } from '@loopback/authentication-jwt';

@model({
  settings: {idInjection: false, postgresql: {schema: 'folk_tune', table: 'user'}}
})
export class User extends OrigUser {

  [prop: string]: any;
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

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
