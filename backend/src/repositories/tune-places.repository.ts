import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {TunePlaces, TunePlacesRelations, Persons, TunePlaceTypes, Parishes, Municipalities, Villages} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PersonsRepository} from './persons.repository';
import {TunePlaceTypesRepository} from './tune-place-types.repository';
import {ParishesRepository} from './parishes.repository';
import {MunicipalitiesRepository} from './municipalities.repository';
import {VillagesRepository} from './villages.repository';

export class TunePlacesRepository extends DefaultCrudRepository<
  TunePlaces,
  typeof TunePlaces.prototype.id,
  TunePlacesRelations
> {

  public readonly persons: HasOneRepositoryFactory<Persons, typeof TunePlaces.prototype.id>;

  public readonly tunePlaceTypes: HasOneRepositoryFactory<TunePlaceTypes, typeof TunePlaces.prototype.id>;

  public readonly parishes: HasOneRepositoryFactory<Parishes, typeof TunePlaces.prototype.id>;

  public readonly municipalities: HasOneRepositoryFactory<Municipalities, typeof TunePlaces.prototype.id>;

  public readonly villages: HasOneRepositoryFactory<Villages, typeof TunePlaces.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('PersonsRepository') protected personsRepositoryGetter: Getter<PersonsRepository>, @repository.getter('TunePlaceTypesRepository') protected tunePlaceTypesRepositoryGetter: Getter<TunePlaceTypesRepository>, @repository.getter('ParishesRepository') protected parishesRepositoryGetter: Getter<ParishesRepository>, @repository.getter('MunicipalitiesRepository') protected municipalitiesRepositoryGetter: Getter<MunicipalitiesRepository>, @repository.getter('VillagesRepository') protected villagesRepositoryGetter: Getter<VillagesRepository>,
  ) {
    super(TunePlaces, dataSource);
    this.villages = this.createHasOneRepositoryFactoryFor('villages', villagesRepositoryGetter);
    this.registerInclusionResolver('villages', this.villages.inclusionResolver);
    this.municipalities = this.createHasOneRepositoryFactoryFor('municipalities', municipalitiesRepositoryGetter);
    this.registerInclusionResolver('municipalities', this.municipalities.inclusionResolver);
    this.parishes = this.createHasOneRepositoryFactoryFor('parishes', parishesRepositoryGetter);
    this.registerInclusionResolver('parishes', this.parishes.inclusionResolver);
    this.tunePlaceTypes = this.createHasOneRepositoryFactoryFor('tunePlaceTypes', tunePlaceTypesRepositoryGetter);
    this.registerInclusionResolver('tunePlaceTypes', this.tunePlaceTypes.inclusionResolver);
    this.persons = this.createHasOneRepositoryFactoryFor('persons', personsRepositoryGetter);
    this.registerInclusionResolver('persons', this.persons.inclusionResolver);
  }
}
