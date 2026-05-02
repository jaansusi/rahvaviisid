import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

// Local-state text input that pushes its value up after the user stops typing,
// so each keypress doesn't trigger a router update + search round trip.
const TextFilter = ({ filter, value, onChange, debounceMs = 300 }) => {
    const { t } = useTranslation('common');
    const [local, setLocal] = useState(value || '');

    useEffect(() => { setLocal(value || ''); }, [value]);

    useEffect(() => {
        if (local === (value || '')) return;
        const handle = setTimeout(() => onChange(local), debounceMs);
        return () => clearTimeout(handle);
    }, [local, value, debounceMs, onChange]);

    return (
        <TextField
            size='small'
            label={t(filter.labelKey)}
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            variant='outlined'
            fullWidth
        />
    );
};

export default TextFilter;
