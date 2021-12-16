import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {SongGenres, SongGenresRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';

export class SongGenresRepository extends DefaultCrudRepository<
  SongGenres,
  typeof SongGenres.prototype.id,
  SongGenresRelations
> {

  public readonly songGenres: HasOneRepositoryFactory<SongGenres, typeof SongGenres.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('SongGenresRepository') protected songGenresRepositoryGetter: Getter<SongGenresRepository>,
  ) {
    super(SongGenres, dataSource);
    this.songGenres = this.createHasOneRepositoryFactoryFor('songGenres', Getter.fromValue(this));
    this.registerInclusionResolver('songGenres', this.songGenres.inclusionResolver);
  }
}
