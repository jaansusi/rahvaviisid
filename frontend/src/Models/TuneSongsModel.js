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
    // edit: {
    //     fields: [
    //         { field: 'id', hidden: true },
    //         { field: 'tunesId', hidden: true },
    //         { field: 'alter', headerName: 'tune.alter' },
    //         { field: 'tempo', headerName: 'tune.tempo' },
    //         { field: 'rhythmType', headerName: 'tune.rhythmType' },
    //         { field: 'noteLength', headerName: 'tune.noteLength' },
    //         { field: 'melody', type: 'textbox', headerName: 'tune.melody' },
    //         { field: 'words', type: 'textbox', headerName: 'tune.words' },
    //         { field: 'customInput', type: 'textbox', headerName: 'tune.customInput' },
    //         { field: 'variationIndex', hidden: true },

    //     ]
    // }
});

export default TuneSongsModel;