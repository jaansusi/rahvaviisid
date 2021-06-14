import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import { DbDataSource } from '../datasources';
import {AuditLog, Users} from '../models';
import {UsersRepository} from './users.repository';

export class AuditLogRepository extends DefaultCrudRepository<
  AuditLog,
  typeof AuditLog.prototype.id
> {

  public readonly actor: HasOneRepositoryFactory<Users, typeof Users.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>,
  ) {
    super(AuditLog, dataSource);
    this.actor = this.createHasOneRepositoryFactoryFor('actor', usersRepositoryGetter);
    this.registerInclusionResolver('actor', this.actor.inclusionResolver);
  }
}