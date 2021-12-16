import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {Persons, PersonsRelations, Sexes, Tunes, TunesPersonsRoles} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {SexesRepository} from './sexes.repository';
import {TunesRepository} from './tunes.repository';
import {TunesPersonsRolesRepository} from './tunes-persons-roles.repository'


export class PersonsRepository extends DefaultCrudRepository<
  Persons,
  typeof Persons.prototype.id,
  PersonsRelations
> {

  public readonly sexes: HasOneRepositoryFactory<
  Sexes, 
  typeof Persons.prototype.id
  >;
 
  public readonly tunes: HasManyThroughRepositoryFactory<
  Tunes,
  typeof Tunes.prototype.id,
  TunesPersonsRoles,
  typeof Persons.prototype.id
>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, 
    @repository.getter('SexesRepository') 
    protected sexesRepositoryGetter: Getter<SexesRepository>,
    @repository.getter('TunesRepository')
    protected tunesRepositoryGetter: Getter<TunesRepository>, 
    @repository.getter('TunesPersonsRolesRepository')
    protected tunesPersonsRolesRepositoryGetter: Getter<TunesPersonsRolesRepository>,
  ) {
    super(Persons, dataSource);
    this.sexes = this.createHasOneRepositoryFactoryFor('sexes', sexesRepositoryGetter);
    this.registerInclusionResolver('sexes', this.sexes.inclusionResolver);
    this.tunes = this.createHasManyThroughRepositoryFactoryFor(
      'tunes',
      tunesRepositoryGetter,
      tunesPersonsRolesRepositoryGetter,
    );
    this.registerInclusionResolver(
      'tunes',
      this.tunes.inclusionResolver,
    );
  }
}
