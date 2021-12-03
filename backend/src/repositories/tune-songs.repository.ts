import {DefaultCrudRepository, HasManyThroughRepositoryFactory, repository} from '@loopback/repository';
import {TuneSongs, TuneSongsRelations, TuneSongsSongGenres, SongGenres, SongTopics, TuneGenres, VerseForms, TuneSongsSongTopics, TuneSongsTuneGenres, TuneSongsVerseForms} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TuneSongsSongGenresRepository} from './tune-songs-song-genres.repository';
import {TuneSongsSongTopicsRepository} from './tune-songs-song-topics.repository';
import {TuneSongsTuneGenresRepository} from './tune-songs-tune-genres.repository';
import {TuneSongsVerseFormsRepository} from './tune-songs-verse-forms.repository';
import { SongGenresRepository } from './song-genres.repository';
import { SongTopicsRepository } from './song-topics.repository';
import { TuneGenresRepository } from './tune-genres.repository';
import { VerseFormsRepository } from './verse-forms.repository';


export class TuneSongsRepository extends DefaultCrudRepository<
  TuneSongs,
  typeof TuneSongs.prototype.id,
  TuneSongsRelations
> {
  public readonly songGenres: HasManyThroughRepositoryFactory<
  SongGenres,
  typeof SongGenres.prototype.id,
  TuneSongsSongGenres,
  typeof TuneSongs.prototype.id
  >;

  public readonly songTopics: HasManyThroughRepositoryFactory<
  SongTopics,
  typeof SongTopics.prototype.id,
  TuneSongsSongTopics,
  typeof TuneSongs.prototype.id
  >;

  public readonly tuneGenres: HasManyThroughRepositoryFactory<
  TuneGenres,
  typeof TuneGenres.prototype.id,
  TuneSongsTuneGenres,
  typeof TuneSongs.prototype.id
  >;

  public readonly verseForms: HasManyThroughRepositoryFactory<
  VerseForms,
  typeof VerseForms.prototype.id,
  TuneSongsVerseForms,
  typeof TuneSongs.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('TuneSongsSongGenresRepository')
    protected tuneSongsSongGenresRepositoryGetter: Getter<TuneSongsSongGenresRepository>,
    @repository.getter('SongGenresRepository')
    protected songGenresRepositoryGetter: Getter<SongGenresRepository>,   
   
    @repository.getter('TuneSongsSongTopicsRepository')
    protected TuneSongsSongTopicsRepositoryGetter: Getter<TuneSongsSongTopicsRepository>,
    @repository.getter('SongTopicsRepository')
    protected songTopicsRepositoryGetter: Getter<SongTopicsRepository>,   

    @repository.getter('TuneSongsTuneGenresRepository')
    protected tuneSongsTuneGenresRepositoryGetter: Getter<TuneSongsTuneGenresRepository>,
    @repository.getter('TuneGenresRepository')
    protected tuneGenresRepositoryGetter: Getter<TuneGenresRepository>,   

    @repository.getter('TuneSongsVerseFormsRepository')
    protected tuneSongsVerseFormsRepositoryGetter: Getter<TuneSongsVerseFormsRepository>,
    @repository.getter('VerseFormsRepository')
    protected verseFormsRepositoryGetter: Getter<VerseFormsRepository>,   

    ) {
    super(TuneSongs, dataSource);
    this.songGenres = this.createHasManyThroughRepositoryFactoryFor(
      'songGenres',
      songGenresRepositoryGetter,
      tuneSongsSongGenresRepositoryGetter,
    );
    this.registerInclusionResolver(
      'songGenres',
      this.songGenres.inclusionResolver,
    );

    this.songTopics = this.createHasManyThroughRepositoryFactoryFor(
      'songTopics',
      songTopicsRepositoryGetter,
      TuneSongsSongTopicsRepositoryGetter,
    );
    this.registerInclusionResolver(
      'songTopics',
      this.songTopics.inclusionResolver,
    );

    this.tuneGenres = this.createHasManyThroughRepositoryFactoryFor(
      'tuneGenres',
      tuneGenresRepositoryGetter,
      tuneSongsTuneGenresRepositoryGetter,
    );
    this.registerInclusionResolver(
      'tuneGenres',
      this.tuneGenres.inclusionResolver,
    );

    this.verseForms = this.createHasManyThroughRepositoryFactoryFor(
      'verseForms',
      verseFormsRepositoryGetter,
      tuneSongsVerseFormsRepositoryGetter,
    );
    this.registerInclusionResolver(
      'verseForms',
      this.verseForms.inclusionResolver,
    );
  }
}
