const PersonMap = {
    apiPath: 'persons',
    list: [
        { field: 'pid', headerName: 'person.pid', width: 170 },
        { field: 'surname', headerName: 'person.surname', width: 170 },
        { field: 'givenName', headerName: 'person.givenName', width: 170 },
        { field: 'nickname', headerName: 'person.nickname', width: 170 },
        { field: 'birthYear', headerName: 'person.birthYear', width: 70 },
        { field: 'deathYear', headerName: 'person.deathYear', width: 70 },
        { field: 'sex', headerName: 'person.sex', width: 70 }
    ],
    view: [
        { header: 'person.pid', getter: x => x.pid },
        { header: 'person.givenName', getter: x => x.givenName },
        { header: 'person.surname', getter: x => x.surname },
        { header: 'date.created', getter: x => x.created },
        { header: 'date.modified', getter: x => x.modified }
    ],
    edit: [
        { name: 'pid', type: 'number', header: 'person.pid' },
        { name: 'givenName', header: 'person.givenName' },
        { name: 'surname', header: 'person.surname' },
        { name: 'nickname', header: 'person.nickname' },
        { name: 'birthYear', type: 'number', header: 'person.birthYear' },
        { name: 'deathYear', type: 'number', header: 'person.deathYear' },
        { name: 'sexId', type: 'number', header: 'person.sex' },
        { name: 'remarks', header: 'common.remarks' }
    ]
};

export default PersonMap;