import modelParser from './ModelParser';

const ExternalReferenceModel = modelParser({
    table: {
        label: 'reference.label',
        fields: [
            
            { field: 'description', headerName: 'reference.description' },
            { field: 'value', type: 'url', format: 'https://kivike.kirmus.ee/index.php?oid=1&module=400&op=3&pid=%_%', headerName: 'reference.url' },
        ]
    },
    view: {
        fields: [
            { field: 'value', headerName: 'reference.pid' },
        ]
    }
});

export default ExternalReferenceModel;