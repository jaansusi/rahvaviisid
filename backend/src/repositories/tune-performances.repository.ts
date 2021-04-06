import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {TunePerformances, TunePerformancesRelations, ActualPerformanceTypes, ActualActionTypes, TraditionalPerformanceTypes, TraditionalActionTypes} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ActualPerformanceTypesRepository} from './actual-performance-types.repository';
import {ActualActionTypesRepository} from './actual-action-types.repository';
import {TraditionalPerformanceTypesRepository} from './traditional-performance-types.repository';
import {TraditionalActionTypesRepository} from './traditional-action-types.repository';

export class TunePerformancesRepository extends DefaultCrudRepository<
  TunePerformances,
  typeof TunePerformances.prototype.id,
  TunePerformancesRelations
> {

  public readonly actualPerformanceTypes: HasOneRepositoryFactory<ActualPerformanceTypes, typeof TunePerformances.prototype.id>;

  public readonly actualActionTypes: HasOneRepositoryFactory<ActualActionTypes, typeof TunePerformances.prototype.id>;

  public readonly traditionalPerformanceTypes: HasOneRepositoryFactory<TraditionalPerformanceTypes, typeof TunePerformances.prototype.id>;

  public readonly traditionalActionTypes: HasOneRepositoryFactory<TraditionalActionTypes, typeof TunePerformances.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ActualPerformanceTypesRepository') protected actualPerformanceTypesRepositoryGetter: Getter<ActualPerformanceTypesRepository>, @repository.getter('ActualActionTypesRepository') protected actualActionTypesRepositoryGetter: Getter<ActualActionTypesRepository>, @repository.getter('TraditionalPerformanceTypesRepository') protected traditionalPerformanceTypesRepositoryGetter: Getter<TraditionalPerformanceTypesRepository>, @repository.getter('TraditionalActionTypesRepository') protected traditionalActionTypesRepositoryGetter: Getter<TraditionalActionTypesRepository>,
  ) {
    super(TunePerformances, dataSource);
    this.traditionalActionTypes = this.createHasOneRepositoryFactoryFor('traditionalActionTypes', traditionalActionTypesRepositoryGetter);
    this.registerInclusionResolver('traditionalActionTypes', this.traditionalActionTypes.inclusionResolver);
    this.traditionalPerformanceTypes = this.createHasOneRepositoryFactoryFor('traditionalPerformanceTypes', traditionalPerformanceTypesRepositoryGetter);
    this.registerInclusionResolver('traditionalPerformanceTypes', this.traditionalPerformanceTypes.inclusionResolver);
    this.actualActionTypes = this.createHasOneRepositoryFactoryFor('actualActionTypes', actualActionTypesRepositoryGetter);
    this.registerInclusionResolver('actualActionTypes', this.actualActionTypes.inclusionResolver);
    this.actualPerformanceTypes = this.createHasOneRepositoryFactoryFor('actualPerformanceTypes', actualPerformanceTypesRepositoryGetter);
    this.registerInclusionResolver('actualPerformanceTypes', this.actualPerformanceTypes.inclusionResolver);
  }
}
