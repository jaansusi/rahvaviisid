import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {SoundRanges, SoundRangesRelations, Tunes, MusicalCharacteristics} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TunesRepository} from './tunes.repository';
import { MusicalCharacteristicsRepository } from './musical-characteristics.repository';

export class SoundRangesRepository extends DefaultCrudRepository<
  SoundRanges,
  typeof SoundRanges.prototype.id,
  SoundRangesRelations
> {
  public readonly tunes: HasManyThroughRepositoryFactory<
  Tunes, 
  typeof Tunes.prototype.id,
  MusicalCharacteristics,
  typeof SoundRanges.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('TunesRepository')
    tunesRepositoryGetter: Getter<TunesRepository>,
    @repository.getter('MusicalCharacteristicsRepository')
    musicalCharacteristicsRepositoryGetter: Getter<MusicalCharacteristicsRepository>,
  ) {
    super(SoundRanges, dataSource);
    this.tunes = this.createHasManyThroughRepositoryFactoryFor(
      'tunes',
      tunesRepositoryGetter,
      musicalCharacteristicsRepositoryGetter,     
    );
    this.registerInclusionResolver('tunes', this.tunes.inclusionResolver);
  }
}
