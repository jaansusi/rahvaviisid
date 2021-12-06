import { ModelService } from '../Services';

export const TuneSongsModel = ModelService.GenerateDefaults({
    table: {
        label: 'song.song',
        fields: [
            { field: 'songType', headerName: 'song.songType'},
            { field: 'songTitle', headerName: 'song.songTitle'},
            { field: 'firstVerse', headerName: 'song.firstVerse'},
            { field: 'songGenre', headerName: 'song.songGenre'},
            { field: 'tuneGenre', headerName: 'song.tuneGenre'},
            { field: 'songTopic', headerName: 'song.songTopic'},
            { field: 'verseForm', headerName: 'song.verseForm'},
            { field: 'refrain', headerName: 'song.refrain'},
            { field: 'remarks', type: 'textbox', headerName: 'common.remarks'},
            
        ]
    },
    edit: {
        fields: [
            { field: 'id', hidden: true },
            { field: 'tunesId', hidden: true },
            { field: 'songType', headerName: 'song.songType'},
            { field: 'songTitle', headerName: 'song.songTitle'},
            { field: 'firstVerse', headerName: 'song.firstVerse'},
            { field: 'songGenres', type: 'dropdown', headerName: 'song.songGenre', 'apiPath': 'song-genres'},
            { field: 'tuneGenres', type: 'dropdown', headerName: 'song.tuneGenre', 'apiPath': 'tune-genres'},
            { field: 'songTopics', type: 'dropdown', headerName: 'song.songTopic', 'apiPath': 'song-topics'},
            { field: 'verseForms', type: 'dropdown', headerName: 'song.verseForm', 'apiPath': 'verse-forms'},
            { field: 'refrain', type: 'textbox', headerName: 'song.refrain'},
            { field: 'remarks', type: 'textbox', headerName: 'common.remarks'}

        ]
    }
});