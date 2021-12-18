import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {TuneGenres, TuneGenresRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';

export class TuneGenresRepository extends DefaultCrudRepository<
  TuneGenres,
  typeof TuneGenres.prototype.id,
  TuneGenresRelations
> {

  public readonly tuneGenres: HasOneRepositoryFactory<TuneGenres, typeof TuneGenres.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TuneGenresRepository') protected tuneGenresRepositoryGetter: Getter<TuneGenresRepository>,
  ) {
    super(TuneGenres, dataSource);
    this.tuneGenres = this.createHasOneRepositoryFactoryFor('tuneGenres', Getter.fromValue(this));
    this.registerInclusionResolver('tuneGenres', this.tuneGenres.inclusionResolver);
  }
}
