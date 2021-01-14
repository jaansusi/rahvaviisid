const TuneMap = {
    apiPath: 'tunes',
    view: [
        { header: 'common.id', getter: x => x.id },
        { header: 'tune.state', getter: x => x.tuneStateId },
        { header: 'tune.textReference', getter: x => x.textReference },
        { header: 'tune.tuneReference', getter: x => x.tuneReference },
        { header: 'tune.soundReference', getter: x => x.soundReference },
        { header: 'tune.videoReference', getter: x => x.videoReference },
        { header: 'tune.catalogue', getter: x => x.catalogue },
        { header: 'tune.nation', getter: x => x.nationId },
        { header: 'tune.language', getter: x => x.languageId },
        { header: 'tune.country', getter: x => x.countryId },
        { header: 'tune.publications', getter: x => x.publications },
        { header: 'tune.remarks', getter: x => x.remarks },
        { header: 'tune.verifiedBy', getter: x => x.verifiedBy },
        { header: 'tune.verified', getter: x => x.verified },
        { header: 'date.created', getter: x => x.created },
        { header: 'date.modified', getter: x => x.modified }
    ],
    edit: [
        { name: 'tuneStateId', header: 'tune.state' },
        { name: 'textReference', header: 'tune.textReference' },
        { name: 'tuneReference', header: 'tune.tuneReference' },
        { name: 'soundReference', header: 'tune.soundReference' },
        { name: 'videoReference', header: 'tune.videoReference' },
        { name: 'catalogue', header: 'tune.catalogue' },
        { name: 'nationId', header: 'tune.nation' },
        { name: 'languageId', header: 'tune.language' },
        { name: 'countryId', header: 'tune.country' },
        { name: 'publications', header: 'tune.publications' },
        { name: 'remarks', header: 'tune.remarks' },
        { name: 'verifiedBy', header: 'tune.verifiedBy' },
        { name: 'verified', header: 'tune.verified' }
    ]
};

export default TuneMap;