import modelParser from './ModelParser';

const TunePerformancesModel = modelParser({
    table: {
        label: 'performance.performance',
        fields: [
            { field: 'actualPerformanceTypeId', headerName: 'performance.actual.type', selector: 'title'},
            { field: 'traditionalPerformanceTypeId', headerName: 'performance.traditional.type',selector: 'title'},
            { field: 'actualActionTypeId', headerName: 'performance.actual.action',selector: 'title'},
            { field: 'accompaniment', headerName: 'tunepeformances.accompaniment'},
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

export default TunePerformancesModel;