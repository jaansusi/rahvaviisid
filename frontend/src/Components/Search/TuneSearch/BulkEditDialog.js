import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import config from '../../../config';
import { fetchClassifierOptions } from './classifierOptionsCache';

// Whitelist of fields that can be bulk-updated. Mirrors the backend's
// TUNE_BULK_UPDATE_COLUMNS server-side allowlist.
const BULK_FIELDS = [
    { value: 'tuneStateId', kind: 'classifier', apiPath: 'tune-states', labelKey: 'tune.state' },
    { value: 'nationId',    kind: 'classifier', apiPath: 'nations',     labelKey: 'tune.nation' },
    { value: 'languageId',  kind: 'classifier', apiPath: 'languages',   labelKey: 'tune.language' },
    { value: 'countryId',   kind: 'classifier', apiPath: 'countries',   labelKey: 'tune.country' },
];

const BulkEditDialog = ({ open, onClose, q, filters, total, onUpdated }) => {
    const { t } = useTranslation('common');
    const [field, setField] = useState(BULK_FIELDS[0].value);
    const [value, setValue] = useState('');
    const [options, setOptions] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    const fieldDef = useMemo(
        () => BULK_FIELDS.find(f => f.value === field) || BULK_FIELDS[0],
        [field],
    );

    useEffect(() => {
        let active = true;
        setOptions([]);
        setValue('');
        if (fieldDef.kind === 'classifier') {
            fetchClassifierOptions(fieldDef.apiPath).then(opts => {
                if (active) setOptions(opts);
            });
        }
        return () => { active = false; };
    }, [fieldDef]);

    const reset = () => {
        setField(BULK_FIELDS[0].value);
        setValue('');
    };

    const handleSubmit = () => {
        if (value === '' || value == null) return;
        const parsed = fieldDef.kind === 'classifier' ? parseInt(value, 10) : value;
        if (fieldDef.kind === 'classifier' && !Number.isFinite(parsed)) return;
        if (!window.confirm(t('bulkEdit.confirm', { count: total }))) return;
        setSubmitting(true);
        axios
            .post(`${config.apiUrl}/tunes/bulk-update`, {
                q: q || undefined,
                filters,
                patch: { [field]: parsed },
            })
            .then(res => {
                const updated = res.data?.updated ?? 0;
                toast.success(t('bulkEdit.done', { count: updated }));
                if (onUpdated) onUpdated();
                reset();
                onClose();
            })
            .catch(err => {
                console.error('Bulk update failed', err);
                toast.error(t('notification.failed'));
            })
            .finally(() => setSubmitting(false));
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>{t('bulkEdit.title')}</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <Alert severity='info'>
                        {t('bulkEdit.scope', { count: total })}
                    </Alert>
                    <TextField
                        select
                        size='small'
                        label={t('bulkEdit.field')}
                        value={field}
                        onChange={(e) => setField(e.target.value)}
                    >
                        {BULK_FIELDS.map(f => (
                            <MenuItem key={f.value} value={f.value}>
                                {t(f.labelKey)}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        size='small'
                        label={t('bulkEdit.value')}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        disabled={options.length === 0}
                    >
                        {options.map(opt => (
                            <MenuItem key={opt.id} value={opt.id}>
                                {opt.title}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Typography variant='caption' color='text.secondary'>
                        {t('bulkEdit.warning')}
                    </Typography>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={submitting}>{t('action.close')}</Button>
                <Button
                    onClick={handleSubmit}
                    disabled={submitting || total === 0 || value === ''}
                    variant='contained'
                >
                    {t('bulkEdit.apply')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BulkEditDialog;
