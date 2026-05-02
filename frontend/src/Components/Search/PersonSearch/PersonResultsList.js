import React from 'react';
import { Box, Pagination, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { LoadingOverlay } from '../../Layout/LoadingOverlay';
import PersonResultCard, { useRoleTitleById } from './PersonResultCard';

const PersonResultsList = ({
    items, total, page, pageSize, isLoading, error,
    onPageChange, editor, onChanged,
}) => {
    const { t } = useTranslation('common');
    const pageCount = pageSize > 0 ? Math.max(1, Math.ceil(total / pageSize)) : 1;
    const roleTitleById = useRoleTitleById();

    return (
        <Box sx={{ position: 'relative', minHeight: 240 }}>
            <LoadingOverlay show={isLoading} />
            <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ mb: 2 }}>
                <Typography variant='body2' color='text.secondary'>
                    {error
                        ? t('tuneSearch.error')
                        : t('personSearch.totalResults', { count: total })}
                </Typography>
                {pageCount > 1 && (
                    <Pagination
                        size='small'
                        count={pageCount}
                        page={page}
                        onChange={(_, p) => onPageChange(p)}
                    />
                )}
            </Stack>
            {items.length === 0 && !isLoading && !error && (
                <Typography variant='body2' color='text.disabled' sx={{ py: 4, textAlign: 'center' }}>
                    {t('tuneSearch.noResults')}
                </Typography>
            )}
            <Stack spacing={1.5}>
                {items.map(person => (
                    <PersonResultCard
                        key={person.id}
                        person={person}
                        editor={editor}
                        roleTitleById={roleTitleById}
                        onChanged={onChanged}
                    />
                ))}
            </Stack>
            {pageCount > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Pagination
                        count={pageCount}
                        page={page}
                        onChange={(_, p) => onPageChange(p)}
                    />
                </Box>
            )}
        </Box>
    );
};

export default PersonResultsList;
