import { ModelService } from '../Services';

export const ExternalReferenceModel = ModelService.GenerateDefaults({
    table: {
        label: 'reference.label',
        fields: [
            { field: 'description', headerName: 'reference.description' },
            { field: 'value', type: 'url', format: 'https://kivike.kirmus.ee/index.php?oid=1&module=400&op=3&pid=%url%', headerName: 'reference.url' },
        ]
    },
    view: {
        fields: [
            { field: 'value', headerName: 'reference.pid' },
        ]
    },
    edit: {
        fields: [
            { field: 'id', hidden: true },
            { field: 'description', headerName: 'reference.description' },
            { field: 'value', headerName: 'reference.url' },
            { field: 'typeId', type: 'number', default: 1, hidden: true }
        ]
    }
});