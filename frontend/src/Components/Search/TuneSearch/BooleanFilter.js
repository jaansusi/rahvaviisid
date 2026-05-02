import React from 'react';
import { ToggleButton, ToggleButtonGroup, Typography, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

const stateToValue = (v) => {
    if (v === true)  return 'yes';
    if (v === false) return 'no';
    return 'any';
};

const valueToState = (v) => {
    if (v === 'yes') return true;
    if (v === 'no')  return false;
    return undefined;
};

const BooleanFilter = ({ filter, value, onChange }) => {
    const { t } = useTranslation('common');
    return (
        <Stack direction='row' alignItems='center' justifyContent='space-between' spacing={1}>
            <Typography variant='body2' color='text.secondary'>
                {t(filter.labelKey)}
            </Typography>
            <ToggleButtonGroup
                size='small'
                exclusive
                value={stateToValue(value)}
                onChange={(_, v) => v && onChange(valueToState(v))}
            >
                <ToggleButton value='any'>{t('tuneSearch.boolean.any')}</ToggleButton>
                <ToggleButton value='yes'>{t('tuneSearch.boolean.yes')}</ToggleButton>
                <ToggleButton value='no'>{t('tuneSearch.boolean.no')}</ToggleButton>
            </ToggleButtonGroup>
        </Stack>
    );
};

export default BooleanFilter;
