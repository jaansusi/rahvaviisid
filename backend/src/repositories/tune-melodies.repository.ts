import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {TuneMelodies, TuneMelodiesRelations, Tunes} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TunesRepository} from './tunes.repository';

export class TuneMelodiesRepository extends DefaultCrudRepository<
  TuneMelodies,
  typeof TuneMelodies.prototype.id,
  TuneMelodiesRelations
> {

  public readonly tunes: HasOneRepositoryFactory<Tunes, typeof TuneMelodies.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TuneMelodies, dataSource);
  }
}
