import modelParser from './ModelParser';
import PersonModel from './PersonModel';

const TunePersonsModel = modelParser({
    table: {
        label: 'tunepersons.title',
        fields: [
            { field: 'persons', nested: PersonModel.edit, headerName: 'person.name', selector: ['givenName' , 'surname']},
            { field: 'nameOrigin', headerName: 'tunepersons.nameOrigin'},
            { field: 'tunePersonRoleTypes', headerName: 'tunepersons.tunePersonRoleTypes', selector: 'title'},
            { field: 'actionStartYear', headerName: 'tunepersons.actionStartYear'},
            { field: 'actionEndYear', headerName: 'tunepersons.actionEndYear'},
            { field: 'remarks', headerName: 'common.measures'}
        ]
    },
    edit: {
        fields: [
            { field: 'id', hidden: true },
            { field: 'tunesId', hidden: true },
            { field: 'givenName', headerName: 'person.givenName'},
            { field: 'surname', headerName: 'person.surname'},
            { field: 'nameOrigin', headerName: 'tunepersons.nameOrigin'},
            { field: 'tunePersonRoleTypes', headerName: 'tunepersons.tunePersonRoleTypes', selector: 'title'},
            { field: 'actionStartYear', headerName: 'tunepersons.actionStartYear'},
            { field: 'actionEndYear', headerName: 'tunepersons.actionEndYear'},
            { field: 'remarks', headerName: 'common.measures'}
        ]
    }
});

export default TunePersonsModel;