import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {TunesPersonsRoles, TunesPersonsRolesRelations, Persons, TunePersonRoleTypes} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PersonsRepository} from './persons.repository';
import {TunePersonRoleTypesRepository} from './tune-person-role-types.repository';

export class TunesPersonsRolesRepository extends DefaultCrudRepository<
  TunesPersonsRoles,
  typeof TunesPersonsRoles.prototype.id,
  TunesPersonsRolesRelations
> {

  public readonly persons: HasOneRepositoryFactory<Persons, typeof TunesPersonsRoles.prototype.id>;

  public readonly tunePersonRoleTypes: HasOneRepositoryFactory<TunePersonRoleTypes, typeof TunesPersonsRoles.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('PersonsRepository') protected personsRepositoryGetter: Getter<PersonsRepository>, @repository.getter('TunePersonRoleTypesRepository') protected tunePersonRoleTypesRepositoryGetter: Getter<TunePersonRoleTypesRepository>,
  ) {
    super(TunesPersonsRoles, dataSource);
    this.tunePersonRoleTypes = this.createHasOneRepositoryFactoryFor('tunePersonRoleTypes', tunePersonRoleTypesRepositoryGetter);
    this.registerInclusionResolver('tunePersonRoleTypes', this.tunePersonRoleTypes.inclusionResolver);
    this.persons = this.createHasOneRepositoryFactoryFor('persons', personsRepositoryGetter);
    this.registerInclusionResolver('persons', this.persons.inclusionResolver);
  }
}
