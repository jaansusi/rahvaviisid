import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { Box, Button, Grid, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import config from '../../../config';
import { AuthService } from '../../../Services';
import FilterPanel from './FilterPanel';
import SortBar from './SortBar';
import ResultsList from './ResultsList';
import BulkEditDialog from './BulkEditDialog';
import { createUseUrlSearchState } from './useUrlSearchState';
import { FILTER_GROUPS, SORT_OPTIONS, PAGE_SIZE_OPTIONS } from './filterConfig';

const useTuneUrlSearchState = createUseUrlSearchState({
    filterGroups: FILTER_GROUPS,
    defaultSort: 'relevance',
    defaultPageSize: 25,
});

const TuneSearchPage = () => {
    const { t } = useTranslation('common');
    const {
        q, sort, sortDir, page, pageSize, requestFilters,
        setQuery, setSort, setPage, setPageSize, setFilter, clearAll, filters,
    } = useTuneUrlSearchState();

    const [items, setItems]     = useState([]);
    const [total, setTotal]     = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState(null);
    const [refreshTick, setRefreshTick] = useState(0);
    const [bulkOpen, setBulkOpen]       = useState(false);

    const requestSeqRef = useRef(0);

    const editor = AuthService.CanAccess(['editor', 'admin']);
    const refresh = () => setRefreshTick(v => v + 1);

    const requestBody = useMemo(() => ({
        q: q || undefined,
        filters: requestFilters,
        sort,
        sortDir: sortDir || undefined,
        page,
        pageSize,
    }), [q, requestFilters, sort, sortDir, page, pageSize]);

    useEffect(() => {
        const seq = ++requestSeqRef.current;
        setLoading(true);
        setError(null);
        axios
            .post(`${config.apiUrl}/tunes/search`, requestBody, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => {
                if (seq !== requestSeqRef.current) return;
                setItems(Array.isArray(res.data?.items) ? res.data.items : []);
                setTotal(res.data?.total || 0);
            })
            .catch(err => {
                if (seq !== requestSeqRef.current) return;
                console.error('Tune search error', err);
                setError(err);
                setItems([]);
                setTotal(0);
            })
            .finally(() => {
                if (seq !== requestSeqRef.current) return;
                setLoading(false);
            });
    }, [requestBody, refreshTick]);

    const hasActive = useMemo(
        () => Object.keys(filters).length > 0 || q.length > 0,
        [filters, q],
    );

    return (
        <Grid container spacing={2}>
            <Helmet>
                <title>{t('header.searchTunes')} – Rahvaviisid</title>
            </Helmet>
            <Grid item xs={12} md={3.5} lg={3}>
                <FilterPanel
                    groups={FILTER_GROUPS}
                    filters={filters}
                    onChangeFilter={setFilter}
                    onClearAll={clearAll}
                    hasActive={hasActive}
                />
            </Grid>
            <Grid item xs={12} md={8.5} lg={9}>
                <Box>
                    {editor && (
                        <Stack direction='row' spacing={1} sx={{ mb: 2 }}>
                            <Button
                                size='small'
                                variant='contained'
                                component={RouterLink}
                                to='/viisid/uus'
                                startIcon={<AddIcon />}
                            >
                                {t('tuneSearch.newTune')}
                            </Button>
                            <Button
                                size='small'
                                variant='outlined'
                                onClick={() => setBulkOpen(true)}
                                startIcon={<EditIcon />}
                                disabled={total === 0}
                            >
                                {t('bulkEdit.open')}
                            </Button>
                        </Stack>
                    )}
                    <SortBar
                        query={q}
                        onQueryChange={setQuery}
                        sort={sort}
                        sortDir={sortDir}
                        onSortChange={setSort}
                        pageSize={pageSize}
                        onPageSizeChange={setPageSize}
                        sortOptions={SORT_OPTIONS}
                        pageSizeOptions={PAGE_SIZE_OPTIONS}
                    />
                    <ResultsList
                        items={items}
                        total={total}
                        page={page}
                        pageSize={pageSize}
                        isLoading={loading}
                        error={error}
                        onPageChange={setPage}
                        editor={editor}
                        onChanged={refresh}
                    />
                </Box>
            </Grid>
            {editor && (
                <BulkEditDialog
                    open={bulkOpen}
                    onClose={() => setBulkOpen(false)}
                    q={q}
                    filters={requestFilters}
                    total={total}
                    onUpdated={refresh}
                />
            )}
        </Grid>
    );
};

export default TuneSearchPage;
