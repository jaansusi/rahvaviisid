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

  public readonly persons: HasOneRepositoryFactory<Persons, typeof TranscriptionsPersonsRoles.prototype.id>;

  public readonly transcriptionPersonRoleTypes: HasOneRepositoryFactory<TranscriptionPersonRoleTypes, typeof TranscriptionsPersonsRoles.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('PersonsRepository') protected personsRepositoryGetter: Getter<PersonsRepository>, @repository.getter('TranscriptionPersonRoleTypesRepository') protected transcriptionPersonRoleTypesRepositoryGetter: Getter<TranscriptionPersonRoleTypesRepository>, 
  ) {
    super(TranscriptionsPersonsRoles, dataSource);
    this.transcriptionPersonRoleTypes = this.createHasOneRepositoryFactoryFor('transcriptionPersonRoleTypes', transcriptionPersonRoleTypesRepositoryGetter);
    this.registerInclusionResolver('transcriptionPersonRoleTypes', this.transcriptionPersonRoleTypes.inclusionResolver);
    this.persons = this.createHasOneRepositoryFactoryFor('persons', personsRepositoryGetter);
    this.registerInclusionResolver('persons', this.persons.inclusionResolver);
    
  }
}
