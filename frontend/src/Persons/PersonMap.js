const PersonMap = {
    apiPath: 'persons',
    list: [
        { field: 'pid', headerName: 'person.pid', width: 80 },
        { field: 'surname', headerName: 'person.surname', width: 170 },
        { field: 'givenName', headerName: 'person.givenName', width: 140 },
        { field: 'nickname', headerName: 'person.nickname', width: 140 },
        { field: 'birthYear', headerName: 'person.birthYear', width: 150 },
        { field: 'deathYear', headerName: 'person.deathYear', width: 150 },
        { field: 'sex', headerName: 'person.sex', width: 120 }
    ],
    view: [
        { field: 'pid', headerName: 'person.pid' },
        { field: 'givenName', headerName: 'person.givenName' },
        { field: 'surname', headerName: 'person.surname' },
        { field: 'created', headerName: 'date.created' },
        { field: 'modified', headerName: 'date.modified' }
    ],
    edit: [
        { field: 'pid', type: 'number', headerName: 'person.pid' },
        { field: 'givenName', headerName: 'person.givenName' },
        { field: 'surname', headerName: 'person.surname' },
        { field: 'nickname', headerName: 'person.nickname' },
        { field: 'birthYear', type: 'number', headerName: 'person.birthYear' },
        { field: 'deathYear', type: 'number', headerName: 'person.deathYear' },
        { field: 'sexId', type: 'number', headerName: 'person.sex' },
        { field: 'remarks', headerName: 'common.remarks' }
    ]
};

export default PersonMap;