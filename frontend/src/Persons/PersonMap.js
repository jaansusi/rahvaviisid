const PersonMap = {
    apiPath: 'persons',
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