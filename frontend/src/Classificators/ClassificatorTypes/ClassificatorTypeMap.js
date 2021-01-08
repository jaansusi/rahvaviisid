const typeMapper = ((t) => {
    return {

        //Tune classificators
        
        'rahvas': {
            'apiPath': 'nations',
            'headers': [
                t('common.title'), t('common.description'), t('common.active'), t('common.created'), t('common.modified')
            ],
            'getters': [
                x => x.title, x => x.description, x => x.isActive, x => x.created, x => x.modified
            ]
        },
        'keel': {
            'apiPath': 'languages'
        },
        'riik': {
            'apiPath': 'countries'
        },
        'viisiseisund': {
            'apiPath': 'tune-states'
        },
        'viisiliik': {
            'apiPath': 'tune-genres'
        },

        // Person classificators

        'viisitegijaroll': {
            'apiPath': 'tune-person-role-types'
        },
        'kasutajaroll': {
            'apiPath': 'user-role-types'
        },
        'sugu': {
            'apiPath': 'sexes'
        },

        // Place classificators

        'kohaliik': {
            'apiPath': 'tune-place-types'
        },
        'kihelkond': {
            'apiPath': 'parishes'
        },
        'vald': {
            'apiPath': 'municipalities'
        },
        'kyla': {
            'apiPath': 'villages'
        },

        // Performance classificators
        
        'tegeliku-esituse-liik': {
            'apiPath': 'actual-performance-types'
        },
        'traditsioonilise-esituse-liik': {
            'apiPath': 'traditional-performance-types'
        },
        'tegeliku-tegevuse-liik': {
            'apiPath': 'actual-action-types'
        },
        'traditsioonilise-tegevuse-liik': {
            'apiPath': 'traditional-action-types'
        },

        // Song classificators

        'laulu-liik': {
            'apiPath': 'song-genres'
        },
        'laulu-teema': {
            'apiPath': 'song-topics'
        },
        'varsivorm': {
            'apiPath': 'verse-forms'
        },

        // Musical classificators

        'teksti-vorm': {
            'apiPath': 'text-forms'
        },
        'viisi-vorm': {
            'apiPath': 'tune-forms'
        },
        'heliulatus': {
            'apiPath': 'sound-ranges'
        },
        'rytmityyp': {
            'apiPath': 'rhythm-types'
        },
        
        // Transcription classificators
        
        'noodistuse-alus': {
            'apiPath': 'transcription-sources'
        },
        'noodistuse-tegija-roll': {
            'apiPath': 'transcription-person-role-types'
        },

        // Encoding classificators
        
        'votmemark': {
            'apiPath': 'key-signatures'
        },
        'tugiheli': {
            'apiPath': 'support-sounds'
        },
        'korgus': {
            'apiPath': 'pitches'
        },
        'taktimoot': {
            'apiPath': 'measures'
        },
    };
});

export default typeMapper;