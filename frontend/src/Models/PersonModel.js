import { ModelService } from '../Services';



export const PersonModel = ModelService.GenerateDefaults({
    apiPath: 'persons',
    list: {
        fields: [
            { field: 'pid', headerName: 'person.pid', width: 110 },
            { field: 'surname', headerName: 'person.surname', width: 180 },
            { field: 'givenName', headerName: 'person.givenName', width: 140 },
            { field: 'nickname', headerName: 'person.nickname', width: 160 },
            { field: 'birthYear', type: 'number', headerName: 'person.birthYear', width: 200 },
            { field: 'deathYear', type: 'number', headerName: 'person.deathYear', width: 200 },
            { field: 'sexes', headerName: 'person.sex', selector: 'title', width: 150},
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
            { field: 'sexes', headerName: 'person.sex', selector: 'title'},
            { field: 'remarks', type: 'textbox', headerName: 'common.remarks' },
            { field: 'created', headerName: 'date.created' },
            { field: 'modified', headerName: 'date.modified' }           
            //{ field: 'tunes', type: 'associatedAssets', associatedModel: tune_list, headerName: 'common.tunes' }
            
        ]
    },
    edit: {
        fields: [
            { field: 'id', hidden: true },
            { field: 'pid', headerName: 'person.pid', nullable: true },
            { field: 'givenName', headerName: 'person.givenName' },
            { field: 'surname', headerName: 'person.surname' },
            { field: 'nickname', headerName: 'person.nickname' },
            { field: 'birthYear', type: 'number', headerName: 'person.birthYear' },
            { field: 'deathYear', type: 'number', headerName: 'person.deathYear' },
            { field: 'sexId', type: 'dropdown', apiPath: 'sexes', headerName: 'person.sex', required: true },
            { field: 'remarks', type: 'textbox', headerName: 'common.remarks' }
            //{ field: 'tunes', type: 'associatedAssets', associatedModel: TuneModel.list, headerName: 'common.tunes' }
        ]
    }
});