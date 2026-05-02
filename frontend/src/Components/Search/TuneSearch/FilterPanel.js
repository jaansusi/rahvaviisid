import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FilterGroup from './FilterGroup';

const FilterPanel = ({ groups, filters, onChangeFilter, onClearAll, hasActive }) => {
    const { t } = useTranslation('common');

    return (
        <Box
            sx={{
                position: 'sticky',
                top: 16,
                pr: 2,
            }}
        >
            <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ mb: 1 }}>
                <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                    {t('tuneSearch.filters')}
                </Typography>
                <Button
                    size='small'
                    onClick={onClearAll}
                    disabled={!hasActive}
                    color='primary'
                >
                    {t('tuneSearch.clearAll')}
                </Button>
            </Stack>
            {groups.map((group, idx) => (
                <FilterGroup
                    key={group.id}
                    group={group}
                    filters={filters}
                    onChangeFilter={onChangeFilter}
                    defaultExpanded={idx === 0}
                />
            ))}
        </Box>
    );
};

export default FilterPanel;
