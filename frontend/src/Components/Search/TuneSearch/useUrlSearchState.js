import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const MULTISELECT_SEPARATOR = ',';

const parseIds = (raw) => {
    if (!raw) return [];
    return raw
        .split(MULTISELECT_SEPARATOR)
        .map(x => parseInt(x, 10))
        .filter(x => Number.isFinite(x));
};

const parseBoolean = (raw) => {
    if (raw === 'true') return true;
    if (raw === 'false') return false;
    return undefined;
};

const parseDateRange = (raw) => {
    if (!raw) return { from: undefined, to: undefined };
    const [from, to] = raw.split('..');
    return { from: from || undefined, to: to || undefined };
};

const encodeDateRange = ({ from, to }) => {
    if (!from && !to) return null;
    return `${from || ''}..${to || ''}`;
};

const parseNumberRange = (raw) => {
    if (!raw) return { from: undefined, to: undefined };
    const [from, to] = raw.split('..');
    const f = from ? parseInt(from, 10) : NaN;
    const tt = to ? parseInt(to, 10) : NaN;
    return {
        from: Number.isFinite(f) ? f : undefined,
        to: Number.isFinite(tt) ? tt : undefined,
    };
};

const encodeNumberRange = ({ from, to }) => {
    if (from == null && to == null) return null;
    return `${from != null ? from : ''}..${to != null ? to : ''}`;
};

const buildFilterIndex = (filterGroups) => {
    const map = {};
    filterGroups.forEach(g => g.filters.forEach(f => { map[f.urlKey] = f; }));
    return map;
};

// Read every filter value from URLSearchParams as a typed map keyed by urlKey.
export const readFilters = (params, filterIndex) => {
    const out = {};
    Object.values(filterIndex).forEach(filter => {
        const raw = params.get(filter.urlKey);
        if (raw == null) return;
        switch (filter.kind) {
            case 'classifier': {
                const ids = parseIds(raw);
                if (ids.length > 0) out[filter.urlKey] = ids;
                break;
            }
            case 'text': {
                const trimmed = raw.trim();
                if (trimmed.length > 0) out[filter.urlKey] = trimmed;
                break;
            }
            case 'boolean': {
                const v = parseBoolean(raw);
                if (v !== undefined) out[filter.urlKey] = v;
                break;
            }
            case 'dateRange': {
                const range = parseDateRange(raw);
                if (range.from || range.to) out[filter.urlKey] = range;
                break;
            }
            case 'numberRange': {
                const range = parseNumberRange(raw);
                if (range.from != null || range.to != null) out[filter.urlKey] = range;
                break;
            }
            default: break;
        }
    });
    return out;
};

// Translate the urlKey-keyed filter map into the body shape the search endpoint expects.
export const filtersToRequestBody = (filtersByUrlKey, filterIndex) => {
    const filters = {};
    Object.entries(filtersByUrlKey).forEach(([urlKey, value]) => {
        const def = filterIndex[urlKey];
        if (!def) return;
        switch (def.kind) {
            case 'classifier':
            case 'text':
            case 'boolean':
                filters[def.backendKey] = value;
                break;
            case 'dateRange':
            case 'numberRange':
                if (value.from != null && value.from !== '') filters[def.backendKeys.from] = value.from;
                if (value.to   != null && value.to   !== '') filters[def.backendKeys.to]   = value.to;
                break;
            default: break;
        }
    });
    return filters;
};

const writeFilterToParams = (params, filter, value) => {
    const { urlKey, kind } = filter;
    const isEmpty =
        value == null ||
        (Array.isArray(value) && value.length === 0) ||
        (kind === 'text' && value === '') ||
        (kind === 'dateRange' && !value.from && !value.to) ||
        (kind === 'numberRange' && value.from == null && value.to == null);
    if (isEmpty) {
        params.delete(urlKey);
        return;
    }
    switch (kind) {
        case 'classifier':
            params.set(urlKey, value.join(MULTISELECT_SEPARATOR));
            break;
        case 'text':
            params.set(urlKey, value);
            break;
        case 'boolean':
            params.set(urlKey, String(value));
            break;
        case 'dateRange': {
            const encoded = encodeDateRange(value);
            if (encoded) params.set(urlKey, encoded);
            else params.delete(urlKey);
            break;
        }
        case 'numberRange': {
            const encoded = encodeNumberRange(value);
            if (encoded) params.set(urlKey, encoded);
            else params.delete(urlKey);
            break;
        }
        default: break;
    }
};

const RESERVED_URL_PARAMS = ['q', 'sort', 'sortDir', 'page', 'pageSize'];

export const createUseUrlSearchState = ({
    filterGroups,
    defaultSort = 'relevance',
    defaultPageSize = 25,
}) => {
    const filterIndex = buildFilterIndex(filterGroups);

    return () => {
        const [searchParams, setSearchParams] = useSearchParams();

        const state = useMemo(() => ({
            q:        searchParams.get('q') || '',
            sort:     searchParams.get('sort') || defaultSort,
            sortDir:  searchParams.get('sortDir') || '',
            page:     parseInt(searchParams.get('page') || '1', 10) || 1,
            pageSize: parseInt(searchParams.get('pageSize') || String(defaultPageSize), 10) || defaultPageSize,
            filters:  readFilters(searchParams, filterIndex),
        }), [searchParams]);

        const mutate = useCallback((mutator) => {
            setSearchParams(prev => {
                const next = new URLSearchParams(prev);
                mutator(next);
                return next;
            }, { replace: false });
        }, [setSearchParams]);

        const setQuery = useCallback((value) => {
            mutate(p => {
                if (value && value.trim().length > 0) p.set('q', value);
                else p.delete('q');
                p.delete('page');
            });
        }, [mutate]);

        const setSort = useCallback((sort, sortDir) => {
            mutate(p => {
                if (sort) p.set('sort', sort); else p.delete('sort');
                if (sortDir) p.set('sortDir', sortDir); else p.delete('sortDir');
                p.delete('page');
            });
        }, [mutate]);

        const setPage = useCallback((page) => {
            mutate(p => {
                if (page > 1) p.set('page', String(page));
                else p.delete('page');
            });
        }, [mutate]);

        const setPageSize = useCallback((size) => {
            mutate(p => {
                p.set('pageSize', String(size));
                p.delete('page');
            });
        }, [mutate]);

        const setFilter = useCallback((urlKey, value) => {
            const filter = filterIndex[urlKey];
            if (!filter) return;
            mutate(p => {
                writeFilterToParams(p, filter, value);
                p.delete('page');
            });
        }, [mutate]);

        const clearAll = useCallback(() => {
            mutate(p => {
                Object.values(filterIndex).forEach(f => p.delete(f.urlKey));
                RESERVED_URL_PARAMS.forEach(k => p.delete(k));
            });
        }, [mutate]);

        const requestFilters = useMemo(
            () => filtersToRequestBody(state.filters, filterIndex),
            [state.filters],
        );

        return {
            ...state,
            requestFilters,
            setQuery,
            setSort,
            setPage,
            setPageSize,
            setFilter,
            clearAll,
        };
    };
};
