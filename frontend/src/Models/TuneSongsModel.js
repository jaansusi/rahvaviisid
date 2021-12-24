import { ModelService } from '../Services';

export const TuneSongsModel = ModelService.GenerateDefaults({
    table: {
        label: 'song.song',
        singleAsset: true,
        fields: [
            { field: 'songType', headerName: 'song.songType' },
            { field: 'songTitle', headerName: 'song.songTitle' },
            { field: 'firstVerse', headerName: 'song.firstVerse' },
            { field: 'songGenres', headerName: 'song.songGenre', selector: 'title' },
            { field: 'tuneGenres', headerName: 'song.tuneGenre', selector: 'title' },
            { field: 'songTopics', headerName: 'song.songTopic', selector: 'title' },
            { field: 'verseForms', headerName: 'song.verseForm', selector: 'title' },
            { field: 'refrain', headerName: 'song.refrain' },
            { field: 'remarks', type: 'textbox', headerName: 'common.remarks' },
        ]
    },
    edit: {
        fields: [
            { field: 'id', hidden: true },
            { field: 'tunesId', hidden: true },
            { field: 'songType', headerName: 'song.songType' },
            { field: 'songTitle', headerName: 'song.songTitle' },
            { field: 'firstVerse', headerName: 'song.firstVerse' },
            { field: 'songGenres', type: 'multiselect', headerName: 'song.songGenre', apiPath: 'song-genres', selector: 'id' },
            { field: 'tuneGenres', type: 'multiselect', headerName: 'song.tuneGenre', apiPath: 'tune-genres', selector: 'id' },
            { field: 'songTopics', type: 'multiselect', headerName: 'song.songTopic', apiPath: 'song-topics', selector: 'id' },
            { field: 'verseForms', type: 'multiselect', headerName: 'song.verseForm', apiPath: 'verse-forms', selector: 'id' },
            { field: 'refrain', type: 'textbox', headerName: 'song.refrain' },
            { field: 'remarks', type: 'textbox', headerName: 'common.remarks' }
        ]
    }
});