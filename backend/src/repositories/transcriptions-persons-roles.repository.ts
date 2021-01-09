import {DefaultCrudRepository} from '@loopback/repository';
import {TranscriptionsPersonsRoles, TranscriptionsPersonsRolesRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TranscriptionsPersonsRolesRepository extends DefaultCrudRepository<
  TranscriptionsPersonsRoles,
  typeof TranscriptionsPersonsRoles.prototype.id,
  TranscriptionsPersonsRolesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TranscriptionsPersonsRoles, dataSource);
  }
}
