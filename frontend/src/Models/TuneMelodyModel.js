import modelParser from './ModelParser';

const TuneMelodyModel = modelParser({
    apiPath: 'tune-melodies',
    view: {
        fields: [
            { field: 'id', hidden: true },
            { field: 'tunesId', hidden: true },
            { field: 'alter', hidden: true, headerName: 'tune.alter' },
            { field: 'tempo', hidden: true, headerName: 'tune.tempo' },
            { field: 'rhythmType', hidden: true, headerName: 'tune.rhythmType' },
            { field: 'noteLength', hidden: true, headerName: 'tune.noteLength' },
            { field: 'melody', hidden: true, type: 'textbox', headerName: 'tune.melody' },
            { field: 'words', hidden: true, type: 'textbox', headerName: 'tune.words' },
            { field: 'customInput', hidden: true, type: 'textbox', headerName: 'tune.customInput' },
            { field: 'variationIndex', hidden: true },
        ]
    },
    edit: {
        fields: [
            { field: 'id', hidden: true },
            { field: 'tunesId', hidden: true },
            { field: 'alter', headerName: 'tune.alter' },
            { field: 'tempo', headerName: 'tune.tempo' },
            { field: 'rhythmType', headerName: 'tune.rhythmType' },
            { field: 'noteLength', headerName: 'tune.noteLength' },
            { field: 'melody', type: 'textbox', headerName: 'tune.melody' },
            { field: 'words', type: 'textbox', headerName: 'tune.words' },
            { field: 'customInput', type: 'textbox', headerName: 'tune.customInput' },
            { field: 'variationIndex', hidden: true },

        ]
    }
});

export default TuneMelodyModel;