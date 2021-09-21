import {
  DefaultCrudRepository,
  repository,
  HasManyThroughRepositoryFactory,
} from '@loopback/repository';
import {
  TraditionalActionTypes,
  TraditionalActionTypesRelations,
  TunePerformances,
  TunePerformancesTraditionalActionsTypes,
} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TunePerformancesTraditionalActionsTypesRepository} from './tune-performances-traditional-actions.repository';
import {TunePerformancesRepository} from './tune-performances.repository';

export class TraditionalActionTypesRepository extends DefaultCrudRepository<
  TraditionalActionTypes,
  typeof TraditionalActionTypes.prototype.id,
  TraditionalActionTypesRelations
> {
  public readonly tunePerformances: HasManyThroughRepositoryFactory<
    TunePerformances,
    typeof TunePerformances.prototype.id,
    TunePerformancesTraditionalActionsTypes,
    typeof TraditionalActionTypes.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('TunePerformancesTraditionalActionsTypesRepository')
    protected tunePerformancesTraditionalActionsRepositoryGetter: Getter<TunePerformancesTraditionalActionsTypesRepository>,
    @repository.getter('TunePerformancesRepository')
    protected tunePerformancesRepositoryGetter: Getter<TunePerformancesRepository>,
  ) {
    super(TraditionalActionTypes, dataSource);
    this.tunePerformances = this.createHasManyThroughRepositoryFactoryFor(
      'tunePerformances',
      tunePerformancesRepositoryGetter,
      tunePerformancesTraditionalActionsRepositoryGetter,
    );
    this.registerInclusionResolver(
      'tunePerformances',
      this.tunePerformances.inclusionResolver,
    );
  }
}
