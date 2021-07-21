import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {Persons, PersonsRelations, Sexes} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {SexesRepository} from './sexes.repository';

export class PersonsRepository extends DefaultCrudRepository<
  Persons,
  typeof Persons.prototype.id,
  PersonsRelations
> {

  public readonly sexes: HasOneRepositoryFactory<
  Sexes, 
  typeof Persons.prototype.id
  >;
 
  constructor(
    @inject('datasources.db') dataSource: DbDataSource, 
    @repository.getter('SexesRepository') 
    protected sexesRepositoryGetter: Getter<SexesRepository>,
  ) {
    super(Persons, dataSource);
    this.sexes = this.createHasOneRepositoryFactoryFor('sexes', sexesRepositoryGetter);
    this.registerInclusionResolver('sexes', this.sexes.inclusionResolver);
  }
}
