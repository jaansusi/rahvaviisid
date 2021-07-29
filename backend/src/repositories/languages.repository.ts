import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Languages, LanguagesRelations, Tunes} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TunesRepository} from './tunes.repository';

export class LanguagesRepository extends DefaultCrudRepository<
  Languages,
  typeof Languages.prototype.id,
  LanguagesRelations
> {


  public readonly tunesForClassificator: HasManyRepositoryFactory<Tunes, typeof Languages.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('TunesRepository') protected tunesRepositoryGetter: Getter<TunesRepository>,
  ) {
    super(Languages, dataSource);
    this.tunesForClassificator = this.createHasManyRepositoryFactoryFor('tunesForClassificator', tunesRepositoryGetter,);
    this.registerInclusionResolver('tunesForClassificator', this.tunesForClassificator.inclusionResolver);
  }
}
