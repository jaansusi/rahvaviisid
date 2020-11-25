import {DefaultCrudRepository} from '@loopback/repository';
import {TunePersonRoleTypes, TunePersonRoleTypesRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TunePersonRoleTypesRepository extends DefaultCrudRepository<
  TunePersonRoleTypes,
  typeof TunePersonRoleTypes.prototype.id,
  TunePersonRoleTypesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TunePersonRoleTypes, dataSource);
  }
}
