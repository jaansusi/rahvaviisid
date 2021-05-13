import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {Sexes, SexesRelations, Persons} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PersonsRepository} from './persons.repository';

export class SexesRepository extends DefaultCrudRepository<
  Sexes,
  typeof Sexes.prototype.id,
  SexesRelations
> {

  public readonly persons: HasOneRepositoryFactory<Persons, typeof Sexes.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('PersonsRepository') protected personsRepositoryGetter: Getter<PersonsRepository>,
  ) {
    super(Sexes, dataSource);
    this.persons = this.createHasOneRepositoryFactoryFor('persons', personsRepositoryGetter);
    this.registerInclusionResolver('persons', this.persons.inclusionResolver);
  }
}
