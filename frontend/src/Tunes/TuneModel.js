const TuneModel = {
    apiPath: 'tunes',
    list: [
        { field: 'tuneReference', headerName: 'tune.tuneReference', width: 170 },
        { field: 'textReference', headerName: 'tune.textReference', width: 170 },
        { field: 'soundReference', headerName: 'tune.soundReference', width: 170 },
        { field: 'videoReference', headerName: 'tune.videoReference', width: 170 },
        { field: 'catalogue', headerName: 'tune.catalogue', width: 170 },
        { field: 'nationId', headerName: 'tune.nation', width: 70 },
        { field: 'languageId', headerName: 'tune.language', width: 70 },
        { field: 'countryId', headerName: 'tune.country', width: 70 }
    ],
    view: [
        { field: 'id', headerName: 'common.id' },
        { field: 'tuneStateId', headerName: 'tune.state' },
        { field: 'textReference', headerName: 'tune.textReference' },
        { field: 'tuneReference', headerName: 'tune.tuneReference' },
        { field: 'soundReference', headerName: 'tune.soundReference' },
        { field: 'videoReference', headerName: 'tune.videoReference' },
        { field: 'catalogue', headerName: 'tune.catalogue' },
        { field: 'nationId', headerName: 'tune.nation' },
        { field: 'languageId', headerName: 'tune.language' },
        { field: 'countryId', headerName: 'tune.country' },
        { field: 'publications', headerName: 'tune.publications' },
        { field: 'remarks', headerName: 'tune.remarks' },
        { field: 'verifiedBy', headerName: 'tune.verifiedBy' },
        { field: 'verified', headerName: 'tune.verified' },
        { field: 'created', headerName: 'date.created' },
        { field: 'modified', headerName: 'date.modified' }
    ],
    edit: [
        { field: 'id', hidden: true },
        { field: 'tuneStateId', headerName: 'tune.state' },
        { field: 'textReference', headerName: 'tune.textReference' },
        { field: 'tuneReference', headerName: 'tune.tuneReference' },
        { field: 'soundReference', headerName: 'tune.soundReference' },
        { field: 'videoReference', headerName: 'tune.videoReference' },
        { field: 'catalogue', headerName: 'tune.catalogue' },
        { field: 'nationId', headerName: 'tune.nation' },
        { field: 'languageId', headerName: 'tune.language' },
        { field: 'countryId', headerName: 'tune.country' },
        { field: 'publications', headerName: 'tune.publications' },
        { field: 'remarks', headerName: 'tune.remarks' },
        { field: 'verifiedBy', headerName: 'tune.verifiedBy' },
        { field: 'verified', headerName: 'tune.verified' },
        { field: 'tuneMelodies', nested: [
            { field: 'id', hidden: true },
            { field: 'tuneId', hidden: true },
            { field: 'melody', headerName: 'tune.melody' },
            { field: 'clef', headerName: 'tune.clef' },
            { field: 'alter', headerName: 'tune.alter' },
            { field: 'tempo', headerName: 'tune.tempo' },
            { field: 'noteLength', headerName: 'tune.noteLength' },
            { field: 'title', headerName: 'tune.title' },
            { field: 'author', headerName: 'tune.author' },
            { field: 'reference', headerName: 'tune.reference' },
            { field: 'customInput', headerName: 'tune.customInput' }
        ]}
    ]
};

export default TuneModel;