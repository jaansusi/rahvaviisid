import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {SongTopics, SongTopicsRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';

export class SongTopicsRepository extends DefaultCrudRepository<
  SongTopics,
  typeof SongTopics.prototype.id,
  SongTopicsRelations
> {

  public readonly songTopics: HasOneRepositoryFactory<SongTopics, typeof SongTopics.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('SongTopicsRepository') protected songTopicsRepositoryGetter: Getter<SongTopicsRepository>,
  ) {
    super(SongTopics, dataSource);
    this.songTopics = this.createHasOneRepositoryFactoryFor('songTopics', Getter.fromValue(this));
    this.registerInclusionResolver('songTopics', this.songTopics.inclusionResolver);
  }
}
