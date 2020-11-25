import {DefaultCrudRepository} from '@loopback/repository';
import {TranscriptionPersonRoleTypes, TranscriptionPersonRoleTypesRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TranscriptionPersonRoleTypesRepository extends DefaultCrudRepository<
  TranscriptionPersonRoleTypes,
  typeof TranscriptionPersonRoleTypes.prototype.id,
  TranscriptionPersonRoleTypesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TranscriptionPersonRoleTypes, dataSource);
  }
}
