import modelParser from './ModelParser';

const TuneSongsModel = modelParser({
    table: {
        label: 'song.song',
        fields: [
            { field: 'songType', headerName: 'song.songType'},
            { field: 'songTitle', headerName: 'song.songTitle'},
            { field: 'firstVerse', headerName: 'song.firstVerse'},
            { field: 'refrain', headerName: 'song.refrain'},
            { field: 'remarks', headerName: 'common.remarks'}
        ]
    },
    edit: {
        fields: [
            { field: 'id', hidden: true },
            { field: 'tunesId', hidden: true },
            { field: 'songType', headerName: 'song.songType'},
            { field: 'songTitle', headerName: 'song.songTitle'},
            { field: 'firstVerse', headerName: 'song.firstVerse'},
            { field: 'refrain', headerName: 'song.refrain'},
            { field: 'remarks', headerName: 'common.remarks'}

        ]
    }
});

export default TuneSongsModel;