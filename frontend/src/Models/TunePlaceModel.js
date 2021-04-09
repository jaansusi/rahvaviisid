import modelParser from './ModelParser';

const TunePlaceModel = modelParser({
    table: {
        label: 'place.place',
        fields: [
            { field: 'persons', headerName: 'person.name', selector: ['givenName' , 'surname']},
            { field: 'tunePlaceTypes', headerName: 'place.type', selector: 'title' },
            { field: 'parishes', headerName: 'place.parish', selector: 'title' },
            { field: 'municipalities', headerName: 'place.municipality', selector: 'title' },
            { field: 'villages', headerName: 'place.village', selector: 'title' },
            { field: 'otherPlace', headerName: 'place.other' },
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

export default TunePlaceModel;