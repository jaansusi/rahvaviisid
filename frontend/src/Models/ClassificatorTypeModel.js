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
                { field: 'title', headerName: 'common.title', required: true },
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
                            { field: 'tunes', type: 'associatedAssets', associatedModel: TuneModel.list, headerName: 'common.tunes' }
                        ]
                    },
                    edit: {
                        fields: [
                            { field: 'id', hidden: true },
                            { field: 'title', headerName: 'common.title', required: true },
                            { field: 'description', type: 'textbox', headerName: 'common.description' },
                            { field: 'isActive', type: 'boolean', headerName: 'common.active' }
                        ]
                    }
                },
                {
                    name: 'tune.language',
                    url: 'keel',
                    apiPath: 'languages',
                    view: {
                        fields: [
                            { field: 'title', headerName: 'common.title' },
                            { field: 'description', headerName: 'common.description' },
                            { field: 'isActive', type: 'boolean', headerName: 'common.active' },
                            { field: 'created', headerName: 'date.created' },
                            { field: 'modified', headerName: 'date.modified' },
                            { field: 'tunes', type: 'associatedAssets', associatedModel: TuneModel.list, headerName: 'common.tunes' }
                        ]
                    },
                },
                {
                    name: 'tune.country',
                    url: 'riik',
                    apiPath: 'countries',
                    view: {
                        fields: [
                            { field: 'title', headerName: 'common.title' },
                            { field: 'description', headerName: 'common.description' },
                            { field: 'isActive', type: 'boolean', headerName: 'common.active' },
                            { field: 'created', headerName: 'date.created' },
                            { field: 'modified', headerName: 'date.modified' },
                            { field: 'tunes', type: 'associatedAssets', associatedModel: TuneModel.list, headerName: 'common.tunes' }
                        ]
                    },
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
                    apiPath: 'parishes',
                    view: {
                        fields: [
                            { field: 'title', headerName: 'common.title' },
                            { field: 'description', headerName: 'common.description' },
                            { field: 'isActive', type: 'boolean', headerName: 'common.active' },
                            { field: 'created', headerName: 'date.created' },
                            { field: 'modified', headerName: 'date.modified' },
                            { field: 'tunes', type: 'associatedAssets', associatedModel: TuneModel.list, headerName: 'common.tunes' }
                        ]
                    },
                },
                {
                    name: 'place.municipality',
                    url: 'vald',
                    apiPath: 'municipalities',
                    view: {
                        fields: [
                            { field: 'title', headerName: 'common.title' },
                            { field: 'description', headerName: 'common.description' },
                            { field: 'isActive', type: 'boolean', headerName: 'common.active' },
                            { field: 'created', headerName: 'date.created' },
                            { field: 'modified', headerName: 'date.modified' },
                            { field: 'tunes', type: 'associatedAssets', associatedModel: TuneModel.list, headerName: 'common.tunes' }
                        ]
                    },
                },
                {
                    name: 'place.village',
                    url: 'kyla',
                    apiPath: 'villages',
                    view: {
                        fields: [
                            { field: 'title', headerName: 'common.title' },
                            { field: 'description', headerName: 'common.description' },
                            { field: 'isActive', type: 'boolean', headerName: 'common.active' },
                            { field: 'created', headerName: 'date.created' },
                            { field: 'modified', headerName: 'date.modified' },
                            { field: 'tunes', type: 'associatedAssets', associatedModel: TuneModel.list, headerName: 'common.tunes' }
                        ]
                    },
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
                    apiPath: 'song-genres',
                    view: {
                        fields: [
                            { field: 'title', headerName: 'common.title' },
                            { field: 'description', headerName: 'common.description' },
                            { field: 'isActive', type: 'boolean', headerName: 'common.active' },
                            { field: 'created', headerName: 'date.created' },
                            { field: 'modified', headerName: 'date.modified' },
                            { field: 'tunes', type: 'customAssociatedAssets', associatedModel: TuneModel.list, headerName: 'common.tunes' }
                        ]
                    },
                },
                {
                    name: 'tune.genre',
                    url: 'viisi-liik',
                    apiPath: 'tune-genres',
                    view: {
                        fields: [
                            { field: 'title', headerName: 'common.title' },
                            { field: 'description', headerName: 'common.description' },
                            { field: 'isActive', type: 'boolean', headerName: 'common.active' },
                            { field: 'created', headerName: 'date.created' },
                            { field: 'modified', headerName: 'date.modified' },
                            { field: 'tunes', type: 'customAssociatedAssets', associatedModel: TuneModel.list, headerName: 'common.tunes' }
                        ]
                    },
                },
                {
                    name: 'song.topic',
                    url: 'laulu-teema',
                    apiPath: 'song-topics',
                    view: {
                        fields: [
                            { field: 'title', headerName: 'common.title' },
                            { field: 'description', headerName: 'common.description' },
                            { field: 'isActive', type: 'boolean', headerName: 'common.active' },
                            { field: 'created', headerName: 'date.created' },
                            { field: 'modified', headerName: 'date.modified' },
                            { field: 'tunes', type: 'customAssociatedAssets', associatedModel: TuneModel.list, headerName: 'common.tunes' }
                        ]
                    },
                },
                {
                    name: 'song.verse',
                    url: 'varsivorm',
                    apiPath: 'verse-forms',
                    view: {
                        fields: [
                            { field: 'title', headerName: 'common.title' },
                            { field: 'description', headerName: 'common.description' },
                            { field: 'isActive', type: 'boolean', headerName: 'common.active' },
                            { field: 'created', headerName: 'date.created' },
                            { field: 'modified', headerName: 'date.modified' },
                            { field: 'tunes', type: 'customAssociatedAssets', associatedModel: TuneModel.list, headerName: 'common.tunes' }
                        ]
                    },
                }
            ]
        },
        {
            name: 'musical.characteristics',
            models: [
                {
                    name: 'attribute.textForm',
                    url: 'teksti-vorm',
                    apiPath: 'text-forms',
                    view: {
                        fields: [
                            { field: 'title', headerName: 'common.title' },
                            { field: 'description', headerName: 'common.description' },
                            { field: 'isActive', type: 'boolean', headerName: 'common.active' },
                            { field: 'created', headerName: 'date.created' },
                            { field: 'modified', headerName: 'date.modified' },
                            { field: 'tunes', type: 'customAssociatedAssets', associatedModel: TuneModel.list, headerName: 'common.tunes' }
                        ]
                    },
                },
                {
                    name: 'attribute.tuneForm',
                    url: 'viisi-vorm',
                    apiPath: 'tune-forms',
                    view: {
                        fields: [
                            { field: 'title', headerName: 'common.title' },
                            { field: 'description', headerName: 'common.description' },
                            { field: 'isActive', type: 'boolean', headerName: 'common.active' },
                            { field: 'created', headerName: 'date.created' },
                            { field: 'modified', headerName: 'date.modified' },
                            { field: 'tunes', type: 'customAssociatedAssets', associatedModel: TuneModel.list, headerName: 'common.tunes' }
                        ]
                    },
                },
                {
                    name: 'attribute.soundRange',
                    url: 'heliulatus',
                    apiPath: 'sound-ranges',
                    view: {
                        fields: [
                            { field: 'title', headerName: 'common.title' },
                            { field: 'description', headerName: 'common.description' },
                            { field: 'isActive', type: 'boolean', headerName: 'common.active' },
                            { field: 'created', headerName: 'date.created' },
                            { field: 'modified', headerName: 'date.modified' },
                            { field: 'tunes', type: 'associatedAssets', associatedModel: TuneModel.list, headerName: 'common.tunes' }
                        ]
                    },
                },
                {
                    name: 'attribute.rhythmType',
                    url: 'rytmityyp',
                    apiPath: 'rhythm-types',
                    view: {
                        fields: [
                            { field: 'title', headerName: 'common.title' },
                            { field: 'description', headerName: 'common.description' },
                            { field: 'isActive', type: 'boolean', headerName: 'common.active' },
                            { field: 'created', headerName: 'date.created' },
                            { field: 'modified', headerName: 'date.modified' },
                            { field: 'tunes', type: 'customAssociatedAssets', associatedModel: TuneModel.list, headerName: 'common.tunes' }
                        ]
                    },
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
                    apiPath: 'key-signatures',
                    view: {
                        fields: [
                            { field: 'title', headerName: 'common.title' },
                            { field: 'description', headerName: 'common.description' },
                            { field: 'isActive', type: 'boolean', headerName: 'common.active' },
                            { field: 'created', headerName: 'date.created' },
                            { field: 'modified', headerName: 'date.modified' },
                            { field: 'tunes', type: 'associatedAssets', associatedModel: TuneModel.list, headerName: 'common.tunes' }
                        ]
                    },
                },
                {
                    name: 'coding.supportSound',
                    url: 'tugiheli',
                    apiPath: 'support-sounds',
                    view: {
                        fields: [
                            { field: 'title', headerName: 'common.title' },
                            { field: 'description', headerName: 'common.description' },
                            { field: 'isActive', type: 'boolean', headerName: 'common.active' },
                            { field: 'created', headerName: 'date.created' },
                            { field: 'modified', headerName: 'date.modified' },
                            { field: 'tunes', type: 'associatedAssets', associatedModel: TuneModel.list, headerName: 'common.tunes' }
                        ]
                    },
                },
                {
                    name: 'coding.pitch',
                    url: 'korgus',
                    apiPath: 'pitches',
                    view: {
                        fields: [
                            { field: 'title', headerName: 'common.title' },
                            { field: 'description', headerName: 'common.description' },
                            { field: 'isActive', type: 'boolean', headerName: 'common.active' },
                            { field: 'created', headerName: 'date.created' },
                            { field: 'modified', headerName: 'date.modified' },
                            { field: 'tunes', type: 'associatedAssets', associatedModel: TuneModel.list, headerName: 'common.tunes' }
                        ]
                    },
                },
                {
                    name: 'coding.measure',
                    url: 'taktimoot',
                    apiPath: 'measures',
                    view: {
                        fields: [
                            { field: 'title', headerName: 'common.title' },
                            { field: 'description', headerName: 'common.description' },
                            { field: 'isActive', type: 'boolean', headerName: 'common.active' },
                            { field: 'created', headerName: 'date.created' },
                            { field: 'modified', headerName: 'date.modified' },
                            { field: 'tunes', type: 'associatedAssets', associatedModel: TuneModel.list, headerName: 'common.tunes' }
                        ]
                    },
                }
            ]
        }
    ]
};