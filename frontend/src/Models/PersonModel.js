import { ModelService } from '../Services';

export const PersonModel = ModelService.GenerateDefaults({
    apiPath: 'persons',
    list: {
        fields: [
            { field: 'pid', headerName: 'person.pid', width: 80 },
            { field: 'surname', headerName: 'person.surname', width: 170 },
            { field: 'givenName', headerName: 'person.givenName', width: 140 },
            { field: 'nickname', headerName: 'person.nickname', width: 140 },
            { field: 'birthYear', type: 'number', headerName: 'person.birthYear', width: 150 },
            { field: 'deathYear', type: 'number', headerName: 'person.deathYear', width: 150 },
            { field: 'sex', headerName: 'person.sex', width: 120 }
        ]
    },
    view: {
        fields: [
            { field: 'pid', headerName: 'person.pid' },
            { field: 'givenName', headerName: 'person.givenName' },
            { field: 'surname', headerName: 'person.surname' },
            { field: 'nickname', headerName: 'person.nickname' },
            { field: 'birthYear', type: 'number', headerName: 'person.birthYear' },
            { field: 'deathYear', type: 'number', headerName: 'person.deathYear' },
            { field: 'sexId', type: 'dropdown', apiPath: 'sexes', headerName: 'person.sex' },
            { field: 'remarks', headerName: 'common.remarks' },
            { field: 'created', headerName: 'date.created' },
            { field: 'modified', headerName: 'date.modified' }
        ]
    },
    edit: {
        fields: [
            { field: 'id', hidden: true },
            { field: 'pid', headerName: 'person.pid' },
            { field: 'givenName', headerName: 'person.givenName' },
            { field: 'surname', headerName: 'person.surname' },
            { field: 'nickname', headerName: 'person.nickname' },
            { field: 'birthYear', type: 'number', headerName: 'person.birthYear' },
            { field: 'deathYear', type: 'number', headerName: 'person.deathYear' },
            { field: 'sexId', type: 'dropdown', apiPath: 'sexes', headerName: 'person.sex' },
            { field: 'remarks', headerName: 'common.remarks' }
        ]
    }
});