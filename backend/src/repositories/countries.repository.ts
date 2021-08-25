import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Countries, CountriesRelations, Tunes} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TunesRepository} from './tunes.repository';

export class CountriesRepository extends DefaultCrudRepository<
  Countries,
  typeof Countries.prototype.id,
  CountriesRelations
> {

  public readonly tunes: HasManyRepositoryFactory<Tunes, typeof Countries.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TunesRepository') protected tunesRepositoryGetter: Getter<TunesRepository>,
  ) {
    super(Countries, dataSource);
    this.tunes = this.createHasManyRepositoryFactoryFor('tunes', tunesRepositoryGetter,);
    this.registerInclusionResolver('tunes', this.tunes.inclusionResolver);
  }
}
