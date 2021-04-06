import modelParser from './ModelParser';
import TuneMelodyModel from './TuneMelodyModel';

const TuneTranscriptionModel = modelParser({
    view: {
        label: 'tune.transcription',
        fields: [
            { field: 'id', hidden: true },
            { field: 'tunesId', hidden: true },
            { field: 'transcriptionSourceId', headerName: 'tune.alter' },
            { field: 'created', headerName: 'tune.tempo' },
            { field: 'modified', headerName: 'tune.rhythmType' },
            {
                field: 'tuneMelodies',
                headerName: 'tune.variation',
                type: 'array',
                sortBy: 'variationIndex',
                extraComponent: 'TunePlayer',
                nested: TuneMelodyModel.view
            }
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

export default TuneTranscriptionModel;