import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {TranscriptionsPersonsRoles, TranscriptionsPersonsRolesRelations, Persons, TranscriptionPersonRoleTypes} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PersonsRepository} from './persons.repository';
import {TranscriptionPersonRoleTypesRepository} from './transcription-person-role-types.repository';

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
