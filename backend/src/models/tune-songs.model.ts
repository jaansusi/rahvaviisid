import {Entity, model, property, hasMany} from '@loopback/repository';
import { SongGenres } from './song-genres.model';
import { TuneSongsSongGenres } from './tune-songs-song-genres.model';
import { SongTopics } from './song-topics.model';
import { TuneSongsSongTopics } from './tune-songs-song-topics.model';
import { TuneGenres } from './tune-genres.model';
import { TuneSongsTuneGenres } from './tune-songs-tune-genres.model';
import { VerseForms } from './verse-forms.model';
import { TuneSongsVerseForms } from './tune-songs-verse-forms.model';




@model({
  settings: {idInjection: false, postgresql: {schema: 'folk_tune', table: 'tune_songs'}}
})
export class TuneSongs extends Entity {
  @property({
    type: 'number',
    required: false,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'number',
    required: false,
    scale: 0,
    postgresql: {columnName: 'tune_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  tunesId?: number;

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 1000,
      nullable: true
    },
    postgresql: {columnName: 'song_type', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  songType?: string;

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 1000,
      nullable: true
    },
    postgresql: {columnName: 'song_title', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  songTitle?: string;

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 1000,
      nullable: true
    },
    postgresql: {columnName: 'first_verse', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  firstVerse?: string;

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 1000,
      nullable: true
    },
    postgresql: {columnName: 'refrain', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  refrain?: string;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    postgresql: {columnName: 'remarks', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  remarks?: string;

  @property({
    type: 'string',
    required: false,
    postgresql: {columnName: 'created', dataType: 'timestamp without time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  created: string;

  @property({
    type: 'string',
    required: false,
    postgresql: {columnName: 'modified', dataType: 'timestamp without time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  modified: string;

  @hasMany(() => SongGenres, {
    through: {
      model: () => TuneSongsSongGenres,
      keyFrom: 'tuneSongId',
      keyTo: 'songGenreId'
    }})
  songGenres?: SongGenres[];

  @hasMany(() => SongTopics, {
    through: {
      model: () => TuneSongsSongTopics,
      keyFrom: 'tuneSongId',
      keyTo: 'songTopicId'
    }})
    songTopics?: SongTopics[];

  @hasMany(() => TuneGenres, {
    through: {
      model: () => TuneSongsTuneGenres,
      keyFrom: 'tuneSongId',
      keyTo: 'tuneGenreId'
    }})
  tuneGenres?: TuneGenres[];

  @hasMany(() => VerseForms, {
    through: {
      model: () => TuneSongsVerseForms,
      keyFrom: 'tuneSongId',
      keyTo: 'verseFormId'
    }})
  verseForms?: VerseForms[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TuneSongs>) {
    super(data);
  }
}

export interface TuneSongsRelations {
  // describe navigational properties here
}

export type TuneSongsWithRelations = TuneSongs & TuneSongsRelations;
