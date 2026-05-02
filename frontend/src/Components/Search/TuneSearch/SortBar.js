import React, { useEffect, useState } from 'react';
import {
    Box,
    IconButton,
    InputAdornment,
    MenuItem,
    Stack,
    TextField,
    Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useTranslation } from 'react-i18next';
const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

const SortBar = ({
    query, onQueryChange,
    sort, sortDir, onSortChange,
    pageSize, onPageSizeChange,
    sortOptions,
    pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
    queryPlaceholderKey = 'tuneSearch.queryPlaceholder',
}) => {
    const { t } = useTranslation('common');
    const [localQuery, setLocalQuery] = useState(query);

    useEffect(() => { setLocalQuery(query); }, [query]);

    useEffect(() => {
        if (localQuery === query) return;
        const handle = setTimeout(() => onQueryChange(localQuery), 300);
        return () => clearTimeout(handle);
    }, [localQuery, query, onQueryChange]);

    const sortOption = sortOptions.find(o => o.value === sort) || sortOptions[0];
    const effectiveDir = sortDir || sortOption.defaultDir;

    const flipDir = () => {
        const next = effectiveDir === 'asc' ? 'desc' : 'asc';
        onSortChange(sort, next);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            alignItems: 'center',
            mb: 2,
        }}>
            <TextField
                placeholder={t(queryPlaceholderKey)}
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                variant='outlined'
                size='small'
                sx={{ flex: '1 1 280px', minWidth: 220 }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <SearchIcon fontSize='small' />
                        </InputAdornment>
                    ),
                    endAdornment: localQuery ? (
                        <InputAdornment position='end'>
                            <IconButton size='small' onClick={() => setLocalQuery('')}>
                                <ClearIcon fontSize='small' />
                            </IconButton>
                        </InputAdornment>
                    ) : null,
                }}
            />
            <Stack direction='row' spacing={1} alignItems='center'>
                <TextField
                    select
                    size='small'
                    label={t('tuneSearch.sort.label')}
                    value={sort}
                    onChange={(e) => onSortChange(e.target.value, '')}
                    sx={{ minWidth: 160 }}
                >
                    {sortOptions.map(opt => (
                        <MenuItem key={opt.value} value={opt.value}>
                            {t(opt.labelKey)}
                        </MenuItem>
                    ))}
                </TextField>
                <Tooltip title={effectiveDir === 'asc' ? t('tuneSearch.sort.asc') : t('tuneSearch.sort.desc')}>
                    <IconButton size='small' onClick={flipDir}>
                        {effectiveDir === 'asc' ? <ArrowUpwardIcon fontSize='small' /> : <ArrowDownwardIcon fontSize='small' />}
                    </IconButton>
                </Tooltip>
            </Stack>
            <TextField
                select
                size='small'
                label={t('tuneSearch.pageSize')}
                value={pageSize}
                onChange={(e) => onPageSizeChange(parseInt(e.target.value, 10))}
                sx={{ minWidth: 100 }}
            >
                {pageSizeOptions.map(n => (
                    <MenuItem key={n} value={n}>{n}</MenuItem>
                ))}
            </TextField>
        </Box>
    );
};

export default SortBar;
