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


  public readonly tunes: HasManyRepositoryFactory<Tunes, typeof Languages.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('TunesRepository') protected tunesRepositoryGetter: Getter<TunesRepository>,
  ) {
    super(Languages, dataSource);
    this.tunes = this.createHasManyRepositoryFactoryFor('tunes', tunesRepositoryGetter,);
    this.registerInclusionResolver('tunes', this.tunes.inclusionResolver);
  }
}
