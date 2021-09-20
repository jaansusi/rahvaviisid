import { TuneModel } from "./TuneModel";

export const ClassificatorsModel =
{
    default: {
        list: {
            fields: [
                { field: 'title', headerName: 'common.title', width: 170 },
                { field: 'isActive', type: 'boolean', headerName: 'common.active', width: 170 }
            ]
        },
        view: {
            fields: [
                { field: 'title', headerName: 'common.title' },
                { field: 'description', headerName: 'common.description' },
                { field: 'isActive', type: 'boolean', headerName: 'common.active' },
                { field: 'created', headerName: 'date.created' },
                { field: 'modified', headerName: 'date.modified' }
            ]
        },
        edit: {
            fields: [
                { field: 'id', hidden: true },
                { field: 'title', headerName: 'common.title' },
                { field: 'description', type: 'textbox', headerName: 'common.description' },
                { field: 'isActive', type: 'boolean', headerName: 'common.active' }
            ]
        }
    },
    groups: [
        {
            name: 'tune.tune',
            models: [
                {
                    name: 'tune.nation',
                    url: 'rahvus',
                    apiPath: 'nations',
                    list: {
                        fields: [
                            { field: 'title', headerName: 'common.title', width: 170 },
                            { field: 'description', headerName: 'common.description', width: 170 },
                            { field: 'isActive', type: 'boolean', headerName: 'common.active', width: 170 }
                        ]
                    },
                    view: {
                        fields: [
                            { field: 'title', headerName: 'common.title' },
                            { field: 'description', headerName: 'common.description' },
                            { field: 'isActive', headerName: 'common.active' },
                            { field: 'id', type: 'associatedAssetsTable', associatedModel: TuneModel.view, filterableProperty: ['nationId'] }
                        ]
                    },
                    edit: {
                        fields: [
                            { field: 'id', hidden: true },
                            { field: 'title', headerName: 'common.title' },
                            { field: 'description', type: 'textbox', headerName: 'common.description' },
                            { field: 'isActive', type: 'boolean', headerName: 'common.active' }
                        ]
                    }
                },
                {
                    name: 'tune.language',
                    url: 'keel',
                    apiPath: 'languages'
                },
                {
                    name: 'tune.country',
                    url: 'riik',
                    apiPath: 'countries'
                },
                {
                    name: 'tune.state',
                    url: 'viisi-seisund',
                    apiPath: 'tune-states'
                }
            ]
        },
        {
            name: 'person.person',
            models: [
                {
                    name: 'person.role',
                    url: 'viisi-tegija-roll',
                    apiPath: 'tune-person-role-types'
                },
                {
                    name: 'person.sex',
                    url: 'sugu',
                    apiPath: 'sexes'
                }
            ]
        },
        {
            name: 'place.place',
            models: [
                {
                    name: 'place.type',
                    url: 'koha-liik',
                    apiPath: 'tune-place-types'
                },
                {
                    name: 'place.parish',
                    url: 'kihelkond',
                    apiPath: 'parishes'
                },
                {
                    name: 'place.municipality',
                    url: 'vald',
                    apiPath: 'municipalities'
                },
                {
                    name: 'place.village',
                    url: 'kyla',
                    apiPath: 'villages'
                }
            ]
        },
        {
            name: 'performance.performance',
            models: [
                {
                    name: 'performance.actual.type',
                    url: 'tegeliku-esituse-liik',
                    apiPath: 'actual-performance-types'
                },
                {
                    name: 'performance.traditional.type',
                    url: 'traditsioonilise-esituse-liik',
                    apiPath: 'traditional-performance-types'
                },
                {
                    name: 'performance.actual.action',
                    url: 'tegeliku-tegevuse-liik',
                    apiPath: 'actual-action-types'
                },
                {
                    name: 'performance.traditional.action',
                    url: 'traditsioonilise-tegevuse-liik',
                    apiPath: 'traditional-action-types'
                }
            ]
        },
        {
            name: 'song.song',
            models: [
                {
                    name: 'song.genre',
                    url: 'laulu-liik',
                    apiPath: 'song-genres'
                },
                {
                    name: 'tune.genre',
                    url: 'viisi-liik',
                    apiPath: 'tune-genres'
                },
                {
                    name: 'song.topic',
                    url: 'laulu-teema',
                    apiPath: 'song-topics'
                },
                {
                    name: 'song.verse',
                    url: 'varsivorm',
                    apiPath: 'verse-forms'
                }
            ]
        },
        {
            name: 'musical.characteristics',
            models: [
                {
                    name: 'attribute.textForm',
                    url: 'teksti-vorm',
                    apiPath: 'text-forms'
                },
                {
                    name: 'attribute.tuneForm',
                    url: 'viisi-vorm',
                    apiPath: 'tune-forms'
                },
                {
                    name: 'attribute.soundRange',
                    url: 'heliulatus',
                    apiPath: 'sound-ranges'
                },
                {
                    name: 'attribute.rhythmType',
                    url: 'rytmityyp',
                    apiPath: 'rhythm-types'
                }
            ]
        },
        {
            name: 'transcription.transcription',
            models: [
                {
                    name: 'transcription.source',
                    url: 'noodistuse-alus',
                    apiPath: 'transcription-sources'
                },
                {
                    name: 'transcription.personRole',
                    url: 'noodistuse-tegija-roll',
                    apiPath: 'transcription-person-role-types'
                }
            ]
        },
        {
            name: 'coding.coding',
            models: [
                {
                    name: 'coding.keySignature',
                    url: 'votmemark',
                    apiPath: 'key-signatures'
                },
                {
                    name: 'coding.supportSound',
                    url: 'tugiheli',
                    apiPath: 'support-sounds'
                },
                {
                    name: 'coding.pitch',
                    url: 'korgus',
                    apiPath: 'pitches'
                },
                {
                    name: 'coding.measure',
                    url: 'taktimoot',
                    apiPath: 'measures'
                }
            ]
        }
    ]
};