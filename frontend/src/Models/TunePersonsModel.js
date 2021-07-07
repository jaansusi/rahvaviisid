import { PersonModel } from '.';
import { ModelService } from '../Services';

export const TunePersonsModel = ModelService.GenerateDefaults({
    table: {
        label: 'tunepersons.title',
        fields: [
            { field: 'persons', nested: PersonModel.edit, headerName: 'person.name', selector: ['givenName', 'surname']},
            { field: 'nameOrigin', headerName: 'tunepersons.nameOrigin'},
            { field: 'tunePersonRoleTypes', headerName: 'tunepersons.tunePersonRoleTypes', selector: 'title'},
            { field: 'actionStartYear', headerName: 'tunepersons.actionStartYear'},
            { field: 'actionEndYear', headerName: 'tunepersons.actionEndYear'},
            { field: 'remarks', headerName: 'common.remarks'}
        ]
    },
    edit: {
        fields: [
            { field: 'id', hidden: true },
            { field: 'tunesId', hidden: true },
            { field: 'personId', type: 'dropdown', apiPath: 'persons', headerName: 'person.person', title: ['givenName', 'surname'] },
            { field: 'nameOrigin', headerName: 'tunepersons.nameOrigin'},
            { field: 'tunePersonRoleTypeId', type: 'dropdown', apiPath: 'tune-person-role-types', headerName: 'tunepersons.tunePersonRoleTypes', title: 'title'},
            { field: 'actionStartYear', type: 'number', headerName: 'tunepersons.actionStartYear'},
            { field: 'actionEndYear', type: 'number', headerName: 'tunepersons.actionEndYear'},
            { field: 'remarks', type: 'textbox', headerName: 'common.remarks'}
        ]
    }
});