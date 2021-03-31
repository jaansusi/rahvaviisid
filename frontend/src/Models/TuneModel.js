import modelParser from './ModelParser';

const TuneModel = modelParser({
    apiPath: 'tunes',
    list: {
        fields: [
            { field: 'tuneReference', headerName: 'tune.tuneReference', width: 170 },
            { field: 'textReference', headerName: 'tune.textReference', width: 170 },
            { field: 'soundReference', headerName: 'tune.soundReference', width: 170 },
            { field: 'videoReference', headerName: 'tune.videoReference', width: 170 },
            { field: 'catalogue', headerName: 'tune.catalogue', width: 170 },
            { field: 'nationId', headerName: 'tune.nation', width: 70 },
            { field: 'languageId', headerName: 'tune.language', width: 70 },
            { field: 'countryId', headerName: 'tune.country', width: 70 }
        ]
    },
    view: {
        fields: [
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
        ]
    },
    edit: {
        fields: [
            { field: 'id', hidden: true },
            { field: 'created', hidden: true },
            { field: 'modified', hidden: true },
            { field: 'tuneStateId', type: 'dropdown', apiPath: 'tune-states', headerName: 'tune.state' },
            { field: 'textReference', headerName: 'tune.textReference' },
            { field: 'tuneReference', headerName: 'tune.tuneReference' },
            { field: 'soundReference', headerName: 'tune.soundReference' },
            { field: 'videoReference', headerName: 'tune.videoReference' },
            { field: 'catalogue', headerName: 'tune.catalogue' },
            { field: 'supportSound', headerName: 'tune.supportSound' },
            { field: 'height', headerName: 'tune.height' },
            { field: 'bar', headerName: 'tune.bar' },
            { field: 'clef', headerName: 'tune.clef' },
            { field: 'nationId', type: 'dropdown', apiPath: 'nations', headerName: 'tune.nation' },
            { field: 'languageId', type: 'dropdown', apiPath: 'languages', headerName: 'tune.language' },
            { field: 'countryId', type: 'dropdown', apiPath: 'countries', headerName: 'tune.country' },
            { field: 'publications', headerName: 'tune.publications' },
            { field: 'remarks', headerName: 'tune.remarks' },
            { field: 'verifiedBy', type: 'number', headerName: 'tune.verifiedBy' },
            { field: 'verified', hidden: true },
            {
                field: 'tuneMelodies',
                type: 'array',
                sortBy: 'variationIndex',
                nested: {
                    apiPath: 'tune-melodies',
                    fields: [
                        { field: 'id', hidden: true },
                        { field: 'tunesId', hidden: true },
                        { field: 'alter', headerName: 'tune.alter' },
                        { field: 'tempo', headerName: 'tune.tempo' },
                        { field: 'rhythmType', headerName: 'tune.rhythmType' },
                        { field: 'noteLength', headerName: 'tune.noteLength' },
                        { field: 'melody', type: 'textbox', headerName: 'tune.melody' },
                        { field: 'words', type: 'textbox', headerName: 'tune.words' },
                        { field: 'customInput', type: 'textbox', headerName: 'tune.customInput' },
                        { field: 'variationIndex', hidden: true },

                    ]
                }
            }
        ]
    }
});

export default TuneModel;