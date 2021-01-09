import {DefaultCrudRepository} from '@loopback/repository';
import {Persons, PersonsRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PersonsRepository extends DefaultCrudRepository<
  Persons,
  typeof Persons.prototype.id,
  PersonsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Persons, dataSource);
  }
}
