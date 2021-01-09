import {DefaultCrudRepository} from '@loopback/repository';
import {KeySignatures, KeySignaturesRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class KeySignaturesRepository extends DefaultCrudRepository<
  KeySignatures,
  typeof KeySignatures.prototype.id,
  KeySignaturesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(KeySignatures, dataSource);
  }
}
