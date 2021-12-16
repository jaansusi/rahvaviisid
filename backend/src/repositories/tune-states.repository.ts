import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {TuneStates, TuneStatesRelations, Tunes} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TunesRepository} from './tunes.repository';

export class TuneStatesRepository extends DefaultCrudRepository<
  TuneStates,
  typeof TuneStates.prototype.id,
  TuneStatesRelations
> {
  public readonly tunes: HasManyRepositoryFactory<Tunes, typeof TuneStates.prototype.id>;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('TunesRepository') protected tunesRepositoryGetter: Getter<TunesRepository>,
  ) {
    super(TuneStates, dataSource);
    this.tunes = this.createHasManyRepositoryFactoryFor('tunes', tunesRepositoryGetter,);
    this.registerInclusionResolver('tunes', this.tunes.inclusionResolver);
  }
}
