import { ModelService } from '../Services';

export const TuneSongsModel = ModelService.GenerateDefaults({
    table: {
        label: 'song.song',
        fields: [
            { field: 'songType', headerName: 'song.songType'},
            { field: 'songTitle', headerName: 'song.songTitle'},
            { field: 'firstVerse', headerName: 'song.firstVerse'},
            { field: null, headerName: 'song.songGenre'},
            { field: null, headerName: 'song.tuneGenre'},
            { field: null, headerName: 'song.songTopic'},
            { field: null, headerName: 'song.verseForm'},
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
            { field: null, headerName: 'song.songGenre'},
            { field: null, headerName: 'song.tuneGenre'},
            { field: null, headerName: 'song.songTopic'},
            { field: null, headerName: 'song.verseForm'},
            { field: 'refrain', type: 'textbox', headerName: 'song.refrain'},
            { field: 'remarks', type: 'textbox', headerName: 'common.remarks'}

        ]
    }
});