import React from 'react';
import { Stack, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const toInputValue = (raw) => {
    if (raw == null) return '';
    return String(raw);
};

const parseInput = (raw) => {
    if (raw === '' || raw == null) return undefined;
    const n = parseInt(raw, 10);
    return Number.isFinite(n) ? n : undefined;
};

const NumberRangeFilter = ({ filter, value, onChange }) => {
    const { t } = useTranslation('common');
    const range = value || { from: undefined, to: undefined };

    const update = (key, raw) => {
        const next = { ...range, [key]: parseInput(raw) };
        onChange(next);
    };

    return (
        <Stack spacing={1}>
            <Typography variant='body2' color='text.secondary'>{t(filter.labelKey)}</Typography>
            <Stack direction='row' spacing={1}>
                <TextField
                    size='small'
                    type='number'
                    label={t(filter.fromLabelKey || 'tuneSearch.dateFrom')}
                    InputLabelProps={{ shrink: true }}
                    value={toInputValue(range.from)}
                    onChange={(e) => update('from', e.target.value)}
                    fullWidth
                />
                <TextField
                    size='small'
                    type='number'
                    label={t(filter.toLabelKey || 'tuneSearch.dateTo')}
                    InputLabelProps={{ shrink: true }}
                    value={toInputValue(range.to)}
                    onChange={(e) => update('to', e.target.value)}
                    fullWidth
                />
            </Stack>
        </Stack>
    );
};

export default NumberRangeFilter;
