const TuneMap = {
    apiPath: 'tunes',
    view: [
        { header: 'date.created', getter: x => x.created },
        { header: 'date.modified', getter: x => x.modified }
    ],
    edit: [
        { header: 'person.pid', getter: x => x.pid }
    ]
};

export default TuneMap;