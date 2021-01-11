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
        { name: 'tuneStateId', header: 'tune.state', getter: x => x.tuneStateId },
        { name: 'textReference', header: 'tune.textReference', getter: x => x.textReference },
        { name: 'tuneReference', header: 'tune.tuneReference', getter: x => x.tuneReference },
        { name: 'soundReference', header: 'tune.soundReference', getter: x => x.soundReference },
        { name: 'videoReference ', header: 'tune.videoReference', getter: x => x.videoReference },
        { name: 'catalogue', header: 'tune.catalogue', getter: x => x.catalogue },
        { name: 'nationId', header: 'tune.nation', getter: x => x.nationId },
        { name: 'languageId', header: 'tune.language', getter: x => x.languageId },
        { name: 'countryId', header: 'tune.country', getter: x => x.countryId },
        { name: 'publications', header: 'tune.publications', getter: x => x.publications },
        { name: 'remarks', header: 'tune.remarks', getter: x => x.remarks },
        { name: 'verifiedBy', header: 'tune.verifiedBy', getter: x => x.verifiedBy },
        { name: 'verified', header: 'tune.verified', getter: x => x.verified }
    ]
};

export default TuneMap;