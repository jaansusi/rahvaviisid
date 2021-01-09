import {DefaultCrudRepository} from '@loopback/repository';
import {UserRoleTypes, UserRoleTypesRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserRoleTypesRepository extends DefaultCrudRepository<
  UserRoleTypes,
  typeof UserRoleTypes.prototype.id,
  UserRoleTypesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(UserRoleTypes, dataSource);
  }
}
