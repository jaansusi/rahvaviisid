// Filter configuration for the person search page (`/otsi/isikud`).
// urlKey  = query-string parameter name (kept stable, slugged in Estonian).
// backendKey = field name expected by POST /persons/search.

export const SORT_OPTIONS = [
    { value: 'relevance', labelKey: 'tuneSearch.sort.relevance', defaultDir: 'desc' },
    { value: 'surname',   labelKey: 'personSearch.sort.surname', defaultDir: 'asc'  },
    { value: 'created',   labelKey: 'tuneSearch.sort.created',   defaultDir: 'desc' },
    { value: 'modified',  labelKey: 'tuneSearch.sort.modified',  defaultDir: 'desc' },
];

export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export const FILTER_GROUPS = [
    {
        id: 'identity',
        titleKey: 'personSearch.group.identity',
        tooltipKey: 'personSearch.tooltip.identity',
        filters: [
            { kind: 'classifier', urlKey: 'sugu', backendKey: 'sexId', apiPath: 'sexes', labelKey: 'person.sex' },
        ],
    },
    {
        id: 'life',
        titleKey: 'personSearch.group.life',
        tooltipKey: 'personSearch.tooltip.life',
        filters: [
            {
                kind: 'numberRange',
                urlKey: 'sundinud',
                backendKeys: { from: 'birthYearFrom', to: 'birthYearTo' },
                labelKey: 'person.birthYear',
                fromLabelKey: 'personSearch.yearFrom',
                toLabelKey: 'personSearch.yearTo',
            },
            {
                kind: 'numberRange',
                urlKey: 'surnud',
                backendKeys: { from: 'deathYearFrom', to: 'deathYearTo' },
                labelKey: 'person.deathYear',
                fromLabelKey: 'personSearch.yearFrom',
                toLabelKey: 'personSearch.yearTo',
            },
        ],
    },
    {
        id: 'roles',
        titleKey: 'personSearch.group.roles',
        tooltipKey: 'personSearch.tooltip.roles',
        filters: [
            { kind: 'classifier', urlKey: 'roll', backendKey: 'roleId', apiPath: 'tune-person-role-types', labelKey: 'person.role' },
        ],
    },
    {
        id: 'geography',
        titleKey: 'personSearch.group.geography',
        tooltipKey: 'personSearch.tooltip.geography',
        filters: [
            { kind: 'classifier', urlKey: 'kihelkond', backendKey: 'parishId', apiPath: 'parishes', labelKey: 'place.parish' },
        ],
    },
];
