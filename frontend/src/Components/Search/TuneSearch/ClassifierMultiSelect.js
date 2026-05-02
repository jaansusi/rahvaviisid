import React, { useEffect, useMemo, useState } from 'react';
import { Autocomplete, Chip, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { fetchClassifierOptions } from './classifierOptionsCache';

const ClassifierMultiSelect = ({ filter, value, onChange }) => {
    const { t } = useTranslation('common');
    const [options, setOptions] = useState([]);
    const [loading, setLoading]   = useState(true);

    useEffect(() => {
        let active = true;
        setLoading(true);
        fetchClassifierOptions(filter.apiPath).then(opts => {
            if (!active) return;
            setOptions(opts);
            setLoading(false);
        });
        return () => { active = false; };
    }, [filter.apiPath]);

    const selectedIds = useMemo(() => value || [], [value]);
    const selectedOptions = useMemo(
        () => options.filter(o => selectedIds.includes(o.id)),
        [options, selectedIds],
    );

    const label = t(filter.labelKey);

    return (
        <Autocomplete
            multiple
            size='small'
            disableCloseOnSelect
            loading={loading}
            options={options}
            value={selectedOptions}
            getOptionLabel={(o) => o?.title ?? ''}
            isOptionEqualToValue={(o, v) => o.id === v.id}
            onChange={(_, newValue) => onChange(newValue.map(o => o.id))}
            renderTags={(values, getTagProps) =>
                values.map((option, index) => (
                    <Chip
                        size='small'
                        variant='outlined'
                        label={option.title}
                        {...getTagProps({ index })}
                        key={option.id}
                    />
                ))
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    variant='outlined'
                    placeholder={selectedIds.length === 0 ? t('tuneSearch.selectPlaceholder') : ''}
                />
            )}
        />
    );
};

export default ClassifierMultiSelect;
