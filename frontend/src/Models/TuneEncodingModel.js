import modelParser from './ModelParser';

const TuneEncodingModel = modelParser({
    table: {
        label: 'encoding.encoding',
        fields: [
            { field: 'tuneEncodingNum', headerName: 'encoding.tuneEncodingNum'},
            { field: 'keySignatures', headerName: 'encoding.keySignatures', selector: 'title'},
            { field: 'supportSounds', headerName: 'encoding.supportSounds', selector: 'title'},
            { field: 'pitches', headerName: 'encoding.pitches', selector: 'title'},
            { field: 'measures', headerName: 'encoding.measures', selector: 'title'},
            { field: 'remarks', headerName: 'tune.remarks' }
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

export default TuneEncodingModel;