const typeMapper = ((t) => {
    return {
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
            'apiPath': 'languages',
            'headers': [
                t('common.title'), t('common.active'), t('common.created'), t('common.modified')
            ],
            'getters': [
                x => x.title, x => x.isActive, x => x.created, x => x.modified
            ]
        },
        'riik': {
            'apiPath': 'countries',
            'headers': [
                t('common.title'), t('common.active'), t('common.created'), t('common.modified')
            ],
            'getters': [
                x => x.title, x => x.isActive, x => x.created, x => x.modified
            ]
        },
        'viisiseisund': {
            'apiPath': 'tune-states',
            'headers': [
                t('common.title'), t('common.active'), t('common.created'), t('common.modified')
            ],
            'getters': [
                x => x.title, x => x.isActive, x => x.created, x => x.modified
            ]
        },
        'viisiliik': {
            'apiPath': 'tune-genres',
            'headers': [
                t('common.title'), t('common.active'), t('common.created'), t('common.modified')
            ],
            'getters': [
                x => x.title, x => x.isActive, x => x.created, x => x.modified
            ]
        }
    };
});

export default typeMapper;