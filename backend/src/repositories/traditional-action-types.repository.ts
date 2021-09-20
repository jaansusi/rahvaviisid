import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {TraditionalActionTypes, TraditionalActionTypesRelations, TunePerformances, TunePerformancesTraditionalActions} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TunePerformancesTraditionalActionsRepository} from './tune-performances-traditional-actions.repository';
import {TunePerformancesRepository} from './tune-performances.repository';

export class TraditionalActionTypesRepository extends DefaultCrudRepository<
  TraditionalActionTypes,
  typeof TraditionalActionTypes.prototype.id,
  TraditionalActionTypesRelations
> {

  public readonly tunePerformances: HasManyThroughRepositoryFactory<TunePerformances, typeof TunePerformances.prototype.id,
          TunePerformancesTraditionalActions,
          typeof TraditionalActionTypes.prototype.id
        >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, 
    @repository.getter('TunePerformancesTraditionalActionsRepository') 
    protected tunePerformancesTraditionalActionsRepositoryGetter: Getter<TunePerformancesTraditionalActionsRepository>, 
    @repository.getter('TunePerformancesRepository') 
    protected tunePerformancesRepositoryGetter: Getter<TunePerformancesRepository>,
  ) {
    super(TraditionalActionTypes, dataSource);
    // this.tunePerformances = this.createHasManyThroughRepositoryFactoryFor('tunePerformances', tunePerformancesRepositoryGetter, tunePerformancesTraditionalActionsRepositoryGetter,);
    // this.registerInclusionResolver('tunePerformances', this.tunePerformances.inclusionResolver);
  }
}
