const ClassificatorsMap =
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
                }
            ]
        }
    ]
};
//         'keel': {
//             'apiPath': 'languages'
//         },
//         'riik': {
//             'apiPath': 'countries'
//         },
//         'viisi-seisund': {
//             'apiPath': 'tune-states'
//         },
//         'viisi-liik': {
//             'apiPath': 'tune-genres'
//         }
//     },


//     // Person classificators

//     'viisi-tegija-roll': {
//         'apiPath': 'tune-person-role-types'
//     },
//     'kasutaja-roll': {
//         'apiPath': 'user-role-types'
//     },
//     'sugu': {
//         'apiPath': 'sexes'
//     },

//     // Place classificators

//     'koha-liik': {
//         'apiPath': 'tune-place-types'
//     },
//     'kihelkond': {
//         'apiPath': 'parishes'
//     },
//     'vald': {
//         'apiPath': 'municipalities'
//     },
//     'kyla': {
//         'apiPath': 'villages'
//     },

//     // Performance classificators

//     'tegeliku-esituse-liik': {
//         'apiPath': 'actual-performance-types'
//     },
//     'traditsioonilise-esituse-liik': {
//         'apiPath': 'traditional-performance-types'
//     },
//     'tegeliku-tegevuse-liik': {
//         'apiPath': 'actual-action-types'
//     },
//     'traditsioonilise-tegevuse-liik': {
//         'apiPath': 'traditional-action-types'
//     },

//     // Song classificators

//     'laulu-liik': {
//         'apiPath': 'song-genres'
//     },
//     'laulu-teema': {
//         'apiPath': 'song-topics'
//     },
//     'varsivorm': {
//         'apiPath': 'verse-forms'
//     },

//     // Musical classificators

//     'teksti-vorm': {
//         'apiPath': 'text-forms'
//     },
//     'viisi-vorm': {
//         'apiPath': 'tune-forms'
//     },
//     'heliulatus': {
//         'apiPath': 'sound-ranges'
//     },
//     'rytmityyp': {
//         'apiPath': 'rhythm-types'
//     },

//     // Transcription classificators

//     'noodistuse-alus': {
//         'apiPath': 'transcription-sources'
//     },
//     'noodistuse-tegija-roll': {
//         'apiPath': 'transcription-person-role-types'
//     },

//     // Encoding classificators

//     'votmemark': {
//         'apiPath': 'key-signatures'
//     },
//     'tugiheli': {
//         'apiPath': 'support-sounds'
//     },
//     'korgus': {
//         'apiPath': 'pitches'
//     },
//     'taktimoot': {
//         'apiPath': 'measures'
//     },
// };

export default ClassificatorsMap;