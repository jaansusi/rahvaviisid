const ClassificatorsModel =
{
    default: {
        list: [
            { field: 'title', headerName: 'common.title', width: 170 },
            { field: 'active', headerName: 'common.active', width: 170 }
        ],
        view: [
            { field: 'title', headerName: 'common.title' },
            { field: 'active', headerName: 'common.active' },
            { field: 'created', headerName: 'common.created' },
            { field: 'modified', headerName: 'common.modified' }
        ],
        edit: [
            { field: 'title', headerName: 'common.title' },
            { field: 'active', headerName: 'common.active' }
        ]
    },
    groups: [
        {
            name: 'tune.tune',
            classificators: [
                {
                    name: 'tune.nation',
                    url: 'rahvas',
                    apiPath: 'nations',
                    list: [
                        { field: 'title', headerName: 'common.title', width: 170 },
                        { field: 'description', headerName: 'common.description', width: 170 },
                        { field: 'active', headerName: 'common.active', width: 170 }
                    ],
                    view: [
                        { field: 'title', headerName: 'common.title' },
                        { field: 'description', headerName: 'common.description' },
                        { field: 'active', headerName: 'common.active' }
                    ],
                    edit: [
                        { field: 'title', headerName: 'common.title' },
                        { field: 'description', headerName: 'common.description' },
                        { field: 'active', headerName: 'common.active' }
                    ]
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
                },
                {
                    name: 'tune.genre',
                    url: 'viisi-liik',
                    apiPath: 'tune-genres'
                }
            ]
        },
        {
            name: 'person.person',
            classificators: [
                {
                    name: 'person.role',
                    url: 'viisi-tegija-roll',
                    apiPath: 'tune-person-role-types'
                },
                {
                    name: 'user.role',
                    url: 'kasutaja-roll',
                    apiPath: 'user-role-types'
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
            classificators: [
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
                    url: 'küla',
                    apiPath: 'villages'
                }
            ]
        },
        {
            name: 'performance.performance',
            classificators: [
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
            classificators: [
                {
                    name: 'song.genre',
                    url: 'laulu-liik',
                    apiPath: 'song-genres'
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
            name: 'song.song',
            classificators: [
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
            classificators: [
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
            classificators: [
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

export default ClassificatorsModel;