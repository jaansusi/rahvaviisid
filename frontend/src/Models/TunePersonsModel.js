import modelParser from './ModelParser';

const TunePersonsModel = modelParser({
    table: {
        label: 'tunepersons.title',
        fields: [
            { field: 'persons', headerName: 'person.name', selector: ['givenName' , 'surname']},
            { field: 'nameOrigin', headerName: 'tunepersons.nameOrigin'},
            { field: 'tunePersonRoleTypes', headerName: 'tunepersons.tunePersonRoleTypes', selector: 'title'},
            { field: 'actionStartYear', headerName: 'tunepersons.actionStartYear'},
            { field: 'actionEndYear', headerName: 'tunepersons.actionEndYear'},
            { field: 'remarks', headerName: 'common.measures'}
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

export default TunePersonsModel;