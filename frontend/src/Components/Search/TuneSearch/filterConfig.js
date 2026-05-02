// Central description of every filter shown in the tune search filter rail.
// urlKey  = query-string parameter (Estonian classifier slug, kept stable so
//           legacy classifier links like /klassifikaatorid/kihelkond/5/vaata
//           continue to work via redirect to /otsi/viisid?kihelkond=5).
// backendKey = field name expected by POST /tunes/search.
// kind = "classifier" (multi-select id list), "text" (substring),
//        "boolean" (any | yes | no), "dateRange" (from/to ISO date strings).

export const SORT_OPTIONS = [
    { value: 'relevance',  labelKey: 'tuneSearch.sort.relevance',  defaultDir: 'desc' },
    { value: 'reference',  labelKey: 'tuneSearch.sort.reference',  defaultDir: 'asc'  },
    { value: 'created',    labelKey: 'tuneSearch.sort.created',    defaultDir: 'desc' },
    { value: 'modified',   labelKey: 'tuneSearch.sort.modified',   defaultDir: 'desc' },
    { value: 'verified',   labelKey: 'tuneSearch.sort.verified',   defaultDir: 'desc' },
];

export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export const FILTER_GROUPS = [
    {
        id: 'identity',
        titleKey: 'tuneSearch.group.identity',
        tooltipKey: 'tuneSearch.tooltip.identity',
        filters: [
            { kind: 'text', urlKey: 'tuneReference',  backendKey: 'tuneReference',  labelKey: 'tune.tuneReference'  },
            { kind: 'text', urlKey: 'textReference',  backendKey: 'textReference',  labelKey: 'tune.textReference'  },
            { kind: 'text', urlKey: 'soundReference', backendKey: 'soundReference', labelKey: 'tune.soundReference' },
            { kind: 'text', urlKey: 'videoReference', backendKey: 'videoReference', labelKey: 'tune.videoReference' },
        ],
    },
    {
        id: 'classification',
        titleKey: 'tuneSearch.group.classification',
        tooltipKey: 'tuneSearch.tooltip.classification',
        filters: [
            { kind: 'classifier', urlKey: 'viisi-seisund', backendKey: 'tuneStateId',     apiPath: 'tune-states',     labelKey: 'tune.state' },
            { kind: 'classifier', urlKey: 'viisi-vorm',    backendKey: 'tuneFormId',      apiPath: 'tune-forms',      labelKey: 'attribute.tuneForm' },
            { kind: 'classifier', urlKey: 'viisi-liik',    backendKey: 'tuneGenreId',     apiPath: 'tune-genres',     labelKey: 'tune.genre' },
            { kind: 'classifier', urlKey: 'rytmityyp',     backendKey: 'rhythmTypeId',    apiPath: 'rhythm-types',    labelKey: 'attribute.rhythmType' },
            { kind: 'classifier', urlKey: 'votmemark',     backendKey: 'keySignatureId',  apiPath: 'key-signatures',  labelKey: 'coding.keySignature' },
            { kind: 'classifier', urlKey: 'korgus',        backendKey: 'pitchId',         apiPath: 'pitches',         labelKey: 'coding.pitch' },
            { kind: 'classifier', urlKey: 'taktimoot',     backendKey: 'measureId',       apiPath: 'measures',        labelKey: 'coding.measure' },
            { kind: 'classifier', urlKey: 'heliulatus',    backendKey: 'soundRangeId',    apiPath: 'sound-ranges',    labelKey: 'attribute.soundRange' },
            { kind: 'classifier', urlKey: 'teksti-vorm',   backendKey: 'textFormId',      apiPath: 'text-forms',      labelKey: 'attribute.textForm' },
            { kind: 'classifier', urlKey: 'varsivorm',     backendKey: 'verseFormId',     apiPath: 'verse-forms',     labelKey: 'song.verse' },
            { kind: 'classifier', urlKey: 'laulu-liik',    backendKey: 'songGenreId',     apiPath: 'song-genres',     labelKey: 'song.genre' },
            { kind: 'classifier', urlKey: 'laulu-teema',   backendKey: 'songTopicId',     apiPath: 'song-topics',     labelKey: 'song.topic' },
        ],
    },
    {
        id: 'geography',
        titleKey: 'tuneSearch.group.geography',
        tooltipKey: 'tuneSearch.tooltip.geography',
        filters: [
            { kind: 'classifier', urlKey: 'kihelkond', backendKey: 'parishId',       apiPath: 'parishes',       labelKey: 'place.parish' },
            { kind: 'classifier', urlKey: 'vald',      backendKey: 'municipalityId', apiPath: 'municipalities', labelKey: 'place.municipality' },
            { kind: 'classifier', urlKey: 'kyla',      backendKey: 'villageId',      apiPath: 'villages',       labelKey: 'place.village' },
        ],
    },
    {
        id: 'origin',
        titleKey: 'tuneSearch.group.origin',
        tooltipKey: 'tuneSearch.tooltip.origin',
        filters: [
            { kind: 'classifier', urlKey: 'rahvus', backendKey: 'nationId',   apiPath: 'nations',   labelKey: 'tune.nation' },
            { kind: 'classifier', urlKey: 'keel',   backendKey: 'languageId', apiPath: 'languages', labelKey: 'tune.language' },
            { kind: 'classifier', urlKey: 'riik',   backendKey: 'countryId',  apiPath: 'countries', labelKey: 'tune.country' },
        ],
    },
    {
        id: 'flags',
        titleKey: 'tuneSearch.group.flags',
        tooltipKey: 'tuneSearch.tooltip.flags',
        filters: [
            { kind: 'boolean', urlKey: 'verified',  backendKey: 'verified',  labelKey: 'tuneSearch.flag.verified' },
            { kind: 'boolean', urlKey: 'hasMelody', backendKey: 'hasMelody', labelKey: 'tuneSearch.flag.hasMelody' },
            { kind: 'boolean', urlKey: 'hasSound',  backendKey: 'hasSound',  labelKey: 'tuneSearch.flag.hasSound' },
            { kind: 'boolean', urlKey: 'hasVideo',  backendKey: 'hasVideo',  labelKey: 'tuneSearch.flag.hasVideo' },
        ],
    },
    {
        id: 'dates',
        titleKey: 'tuneSearch.group.dates',
        tooltipKey: 'tuneSearch.tooltip.dates',
        filters: [
            { kind: 'dateRange', urlKey: 'created',  backendKeys: { from: 'createdFrom',  to: 'createdTo'  }, labelKey: 'date.created' },
            { kind: 'dateRange', urlKey: 'modified', backendKeys: { from: 'modifiedFrom', to: 'modifiedTo' }, labelKey: 'date.modified' },
        ],
    },
];

const ALL_FILTERS = FILTER_GROUPS.flatMap(g => g.filters);

export const findFilterByUrlKey = (urlKey) =>
    ALL_FILTERS.find(f => f.urlKey === urlKey);

// Reserved (non-filter) URL params.
export const RESERVED_PARAMS = new Set([
    'q', 'sort', 'sortDir', 'page', 'pageSize',
]);
