import {DefaultCrudRepository} from '@loopback/repository';
import {TunesPersonsRoles, TunesPersonsRolesRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TunesPersonsRolesRepository extends DefaultCrudRepository<
  TunesPersonsRoles,
  typeof TunesPersonsRoles.prototype.id,
  TunesPersonsRolesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TunesPersonsRoles, dataSource);
  }
}
