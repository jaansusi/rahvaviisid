import React from 'react';
import { Stack, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const formatForInput = (raw) => {
    if (!raw) return '';
    // backend stores ISO timestamps; the date input only needs YYYY-MM-DD.
    return raw.slice(0, 10);
};

const DateRangeFilter = ({ filter, value, onChange }) => {
    const { t } = useTranslation('common');
    const range = value || { from: undefined, to: undefined };

    const update = (key, raw) => {
        const next = { ...range, [key]: raw || undefined };
        onChange(next);
    };

    return (
        <Stack spacing={1}>
            <Typography variant='body2' color='text.secondary'>{t(filter.labelKey)}</Typography>
            <Stack direction='row' spacing={1}>
                <TextField
                    size='small'
                    type='date'
                    label={t('tuneSearch.dateFrom')}
                    InputLabelProps={{ shrink: true }}
                    value={formatForInput(range.from)}
                    onChange={(e) => update('from', e.target.value)}
                    fullWidth
                />
                <TextField
                    size='small'
                    type='date'
                    label={t('tuneSearch.dateTo')}
                    InputLabelProps={{ shrink: true }}
                    value={formatForInput(range.to)}
                    onChange={(e) => update('to', e.target.value)}
                    fullWidth
                />
            </Stack>
        </Stack>
    );
};

export default DateRangeFilter;
