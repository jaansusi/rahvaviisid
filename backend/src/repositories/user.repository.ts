// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/authentication-jwt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasOneRepositoryFactory,
  juggler,
  repository,
} from '@loopback/repository';
import {UserServiceBindings} from '../keys';
import {UserCredentials, UserRelations} from '@loopback/authentication-jwt';
import {UserCredentialsRepository} from '@loopback/authentication-jwt';
import { EkmUser } from '../models';

export class EkmUserRepository extends DefaultCrudRepository<
  EkmUser,
  typeof EkmUser.prototype.id,
  UserRelations
> {
  public readonly userCredentials: HasOneRepositoryFactory<
    UserCredentials,
    typeof EkmUser.prototype.id
  >;
  
  constructor(
    @inject(`datasources.${UserServiceBindings.DATASOURCE_NAME}`)
    dataSource: juggler.DataSource,
    @repository.getter('UserCredentialsRepository')
    protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>,
  ) {
    super(EkmUser, dataSource);
    this.userCredentials = this.createHasOneRepositoryFactoryFor(
      'userCredentials',
      userCredentialsRepositoryGetter,
    );
    this.registerInclusionResolver(
      'userCredentials',
      this.userCredentials.inclusionResolver,
    );
  }

  async findCredentials(
    userId: typeof EkmUser.prototype.id,
  ): Promise<UserCredentials | undefined> {
    try {
      console.log(this.userCredentials(userId).get());
      return this.userCredentials(userId).get();
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
}
