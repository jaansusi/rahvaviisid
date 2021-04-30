import {inject} from '@loopback/core';
import {DefaultCrudRepository, HasOneRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Tunes} from '../models';
import { ExternalReferences, ExternalReferencesRelations } from '../models/external-references.model';

export class ExternalReferencesRepository extends DefaultCrudRepository<
  ExternalReferences,
  typeof ExternalReferences.prototype.id,
  ExternalReferencesRelations
> {
  public readonly tunes: HasOneRepositoryFactory<Tunes, typeof ExternalReferences.prototype.id>;
  
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(ExternalReferences, dataSource);
  }
}
