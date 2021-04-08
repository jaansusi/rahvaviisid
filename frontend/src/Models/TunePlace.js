import modelParser from './ModelParser';

const TunePlaceModel = modelParser({
    view: {
        label: 'tune.place',
        fields: [
            { field: 'id', hidden: true },
            { field: 'tunesId', hidden: true },
            { field: 'personId', headerName: 'person.name' },
            { field: 'tunePlaceTypeId', headerName: 'tune.place.type' },
            { field: 'parishId', headerName: 'location.parish' },
            { field: 'municipalityId', headerName: 'location.municipality' },
            { field: 'villageId', headerName: 'location.village' },
            { field: 'otherPlace', headerName: 'tune.place.other' },
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