import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {ActualPerformanceTypes, ActualPerformanceTypesRelations,Tunes, TunePerformances} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TunesRepository} from './tunes.repository';
import { TunePerformancesRepository } from './tune-performances.repository';

export class ActualPerformanceTypesRepository extends DefaultCrudRepository<
  ActualPerformanceTypes,
  typeof ActualPerformanceTypes.prototype.id,
  ActualPerformanceTypesRelations
> {
  public readonly tunes: HasManyThroughRepositoryFactory<
  Tunes, 
  typeof Tunes.prototype.id,
  TunePerformances,
  typeof ActualPerformanceTypes.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('TunesRepository')
    tunesRepositoryGetter: Getter<TunesRepository>,
    @repository.getter('TunePerformancesRepository')
    tunePerformancesRepositoryGetter: Getter<TunePerformancesRepository>,
  ) {
    super(ActualPerformanceTypes, dataSource);
    this.tunes = this.createHasManyThroughRepositoryFactoryFor(
      'tunes',
      tunesRepositoryGetter,
      tunePerformancesRepositoryGetter,     
    );
    this.registerInclusionResolver('tunes', this.tunes.inclusionResolver);
  }
}
