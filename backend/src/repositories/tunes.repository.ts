import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {Tunes, TunesRelations, TuneMelodies, TuneTranscriptions, Countries, Nations, Languages, TunePerformances, TunePlaces, TunesPersonsRoles, TuneSongs, TuneEncodings} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TuneMelodiesRepository} from './tune-melodies.repository';
import {TuneTranscriptionsRepository} from './tune-transcriptions.repository';
import {CountriesRepository} from './countries.repository';
import {NationsRepository} from './nations.repository';
import {LanguagesRepository} from './languages.repository';
import {TunePerformancesRepository} from './tune-performances.repository';
import {TunePlacesRepository} from './tune-places.repository';
import {TunesPersonsRolesRepository} from './tunes-persons-roles.repository';
import {TuneSongsRepository} from './tune-songs.repository';
import {TuneEncodingsRepository} from './tune-encodings.repository';

export class TunesRepository extends DefaultCrudRepository<
  Tunes,
  typeof Tunes.prototype.id,
  TunesRelations
> {

  public readonly tuneMelodies: HasManyRepositoryFactory<TuneMelodies, typeof Tunes.prototype.id>;
  public readonly tuneTranscriptions: HasManyRepositoryFactory<TuneTranscriptions, typeof Tunes.prototype.id>;

  public readonly countries: HasOneRepositoryFactory<Countries, typeof Tunes.prototype.id>;

  public readonly nations: HasOneRepositoryFactory<Nations, typeof Tunes.prototype.id>;

  public readonly languages: HasOneRepositoryFactory<Languages, typeof Tunes.prototype.id>;

  public readonly tunePerformances: HasManyRepositoryFactory<TunePerformances, typeof Tunes.prototype.id>;

  public readonly tunePlaces: HasManyRepositoryFactory<TunePlaces, typeof Tunes.prototype.id>;

  public readonly tunesPersonsRoles: HasManyRepositoryFactory<TunesPersonsRoles, typeof Tunes.prototype.id>;

  public readonly tuneSongs: HasManyRepositoryFactory<TuneSongs, typeof Tunes.prototype.id>;

  public readonly tuneEncodings: HasManyRepositoryFactory<TuneEncodings, typeof Tunes.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, 
    @repository.getter('TuneMelodiesRepository') protected tuneMelodiesRepositoryGetter: Getter<TuneMelodiesRepository>,
    @repository.getter('TuneTranscriptionsRepository') protected tuneTranscriptionsRepositoryGetter: Getter<TuneTranscriptionsRepository>, @repository.getter('CountriesRepository') protected countriesRepositoryGetter: Getter<CountriesRepository>, @repository.getter('NationsRepository') protected nationsRepositoryGetter: Getter<NationsRepository>, @repository.getter('LanguagesRepository') protected languagesRepositoryGetter: Getter<LanguagesRepository>, @repository.getter('TunePerformancesRepository') protected tunePerformancesRepositoryGetter: Getter<TunePerformancesRepository>, @repository.getter('TunePlacesRepository') protected tunePlacesRepositoryGetter: Getter<TunePlacesRepository>, @repository.getter('TunesPersonsRolesRepository') protected tunesPersonsRolesRepositoryGetter: Getter<TunesPersonsRolesRepository>, @repository.getter('TuneSongsRepository') protected tuneSongsRepositoryGetter: Getter<TuneSongsRepository>, @repository.getter('TuneEncodingsRepository') protected tuneEncodingsRepositoryGetter: Getter<TuneEncodingsRepository>,
  ) {
    super(Tunes, dataSource);
    this.tuneEncodings = this.createHasManyRepositoryFactoryFor('tuneEncodings', tuneEncodingsRepositoryGetter,);
    this.registerInclusionResolver('tuneEncodings', this.tuneEncodings.inclusionResolver);
    this.tuneSongs = this.createHasManyRepositoryFactoryFor('tuneSongs', tuneSongsRepositoryGetter,);
    this.registerInclusionResolver('tuneSongs', this.tuneSongs.inclusionResolver);
    this.tunesPersonsRoles = this.createHasManyRepositoryFactoryFor('tunesPersonsRoles', tunesPersonsRolesRepositoryGetter,);
    this.registerInclusionResolver('tunesPersonsRoles', this.tunesPersonsRoles.inclusionResolver);
    this.tunePlaces = this.createHasManyRepositoryFactoryFor('tunePlaces', tunePlacesRepositoryGetter,);
    this.registerInclusionResolver('tunePlaces', this.tunePlaces.inclusionResolver);
    this.tunePerformances = this.createHasManyRepositoryFactoryFor('tunePerformances', tunePerformancesRepositoryGetter,);
    this.registerInclusionResolver('tunePerformances', this.tunePerformances.inclusionResolver);
    this.languages = this.createHasOneRepositoryFactoryFor('languages', languagesRepositoryGetter);
    this.registerInclusionResolver('languages', this.languages.inclusionResolver);
    this.nations = this.createHasOneRepositoryFactoryFor('nations', nationsRepositoryGetter);
    this.registerInclusionResolver('nations', this.nations.inclusionResolver);
    this.countries = this.createHasOneRepositoryFactoryFor('countries', countriesRepositoryGetter);
    this.registerInclusionResolver('countries', this.countries.inclusionResolver);
    this.tuneMelodies = this.createHasManyRepositoryFactoryFor('tuneMelodies', tuneMelodiesRepositoryGetter);
    this.registerInclusionResolver('tuneMelodies', this.tuneMelodies.inclusionResolver);
    this.tuneTranscriptions = this.createHasManyRepositoryFactoryFor('tuneTranscriptions', tuneTranscriptionsRepositoryGetter);
    this.registerInclusionResolver('tuneTranscriptions', this.tuneTranscriptions.inclusionResolver);
  }
}
