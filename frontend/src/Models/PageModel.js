export const TuneModel = {
    apiPath: 'pages',
    view: {
        fields: [
            { field: 'content', type: 'page', headerName: 'common.id' },
        ]
    },
    edit: {
        fields: [
            { field: 'id', hidden: true },
        ]
    }
};