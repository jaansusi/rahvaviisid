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
        { name: 'pid', type: 'number', header: 'person.pid', getter: x => x.pid },
        { name: 'givenName', header: 'person.givenName', getter: x => x.givenName },
        { name: 'surname', header: 'person.surname', getter: x => x.surname },
        { name: 'nickname', header: 'person.nickname', getter: x => x.nickname },
        { name: 'birthYear', type: 'number', header: 'person.birthYear', getter: x => x.birthYear },
        { name: 'deathYear', type: 'number', header: 'person.deathYear', getter: x => x.deathYear },
        { name: 'sexId', type: 'number', header: 'person.sex', getter: x => x.sexId },
        { name: 'remarks', header: 'common.remarks', getter: x => x.remarks }
    ]
};

export default PersonMap;