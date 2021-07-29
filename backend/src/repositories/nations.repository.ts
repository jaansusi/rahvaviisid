import {DefaultCrudRepository,repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Nations, NationsRelations, Tunes} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TunesRepository} from './tunes.repository';

export class NationsRepository extends DefaultCrudRepository<
  Nations,
  typeof Nations.prototype.id,
  NationsRelations
> {

  public readonly tunesForClassificator: HasManyRepositoryFactory<Tunes, typeof Nations.prototype.id>;
 
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('TunesRepository') protected tunesRepositoryGetter: Getter<TunesRepository>,
  ) {
    super(Nations, dataSource);
    this.tunesForClassificator = this.createHasManyRepositoryFactoryFor('tunesForClassificator', tunesRepositoryGetter,);
    this.registerInclusionResolver('tunesForClassificator', this.tunesForClassificator.inclusionResolver);
 
  }
}
