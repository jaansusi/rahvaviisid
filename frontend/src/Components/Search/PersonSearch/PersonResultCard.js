import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Chip, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import config from '../../../config';
import { fetchClassifierOptions } from '../TuneSearch/classifierOptionsCache';

const formatLifespan = (birth, death) => {
    if (!birth && !death) return null;
    return `${birth ?? '?'} – ${death ?? '?'}`;
};

const fullName = (person) => {
    const parts = [person.givenName, person.surname].filter(Boolean).join(' ');
    if (parts && person.nickname) return `${parts} (${person.nickname})`;
    return parts || person.nickname || `#${person.id}`;
};

const PersonResultCard = ({ person, editor, roleTitleById, onChanged }) => {
    const { t } = useTranslation('common');
    const [deleting, setDeleting] = useState(false);

    const lifespan = formatLifespan(person.birthYear, person.deathYear);
    const roleIds = Array.isArray(person.roleIds) ? person.roleIds.filter(Boolean) : [];
    const tuneCount = typeof person.tuneCount === 'number' ? person.tuneCount : null;

    const handleDelete = () => {
        if (!window.confirm(t('action.confirmDeletion'))) return;
        setDeleting(true);
        axios
            .delete(`${config.apiUrl}/persons/${person.id}`)
            .then(() => {
                toast.success(t('action.deleted'));
                if (onChanged) onChanged();
            })
            .catch(err => {
                console.error('Delete failed', err);
                toast.error(t('notification.failed'));
            })
            .finally(() => setDeleting(false));
    };

    return (
        <Paper
            variant='outlined'
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
            }}
        >
            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Stack direction='row' spacing={1} alignItems='center' sx={{ mb: 0.5 }}>
                    <Typography
                        variant='subtitle1'
                        component={RouterLink}
                        to={`/isikud/${person.id}/vaata`}
                        sx={{
                            fontWeight: 600,
                            color: 'primary.main',
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'underline' },
                        }}
                    >
                        {fullName(person)}
                    </Typography>
                    {person.pid && (
                        <Typography variant='caption' color='text.disabled'>
                            {person.pid}
                        </Typography>
                    )}
                </Stack>
                <Stack direction='row' spacing={2} sx={{ mb: 1, flexWrap: 'wrap' }}>
                    {lifespan && (
                        <Typography variant='body2' color='text.secondary'>
                            {lifespan}
                        </Typography>
                    )}
                    {tuneCount != null && (
                        <Typography variant='body2' color='text.secondary'>
                            {t('personSearch.tuneCount', { count: tuneCount })}
                        </Typography>
                    )}
                </Stack>
                {roleIds.length > 0 && (
                    <Stack direction='row' spacing={1} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                        {roleIds.map(rid => (
                            <Chip
                                key={rid}
                                size='small'
                                variant='outlined'
                                label={roleTitleById?.[rid] || `#${rid}`}
                            />
                        ))}
                    </Stack>
                )}
            </Box>
            <Stack
                spacing={1}
                sx={{
                    flexShrink: 0,
                    minWidth: 140,
                    alignItems: 'flex-end',
                }}
            >
                <Stack direction='row' spacing={1}>
                    <Button
                        size='small'
                        variant='outlined'
                        component={RouterLink}
                        to={`/isikud/${person.id}/vaata`}
                    >
                        {t('action.view')}
                    </Button>
                    {editor && (
                        <Button
                            size='small'
                            variant='outlined'
                            component={RouterLink}
                            to={`/isikud/${person.id}/muuda`}
                        >
                            {t('action.edit')}
                        </Button>
                    )}
                </Stack>
                {editor && (
                    <Tooltip title={t('action.delete')}>
                        <span>
                            <IconButton
                                size='small'
                                color='error'
                                onClick={handleDelete}
                                disabled={deleting}
                            >
                                <DeleteOutlineIcon fontSize='small' />
                            </IconButton>
                        </span>
                    </Tooltip>
                )}
            </Stack>
        </Paper>
    );
};

export const useRoleTitleById = () => {
    const [map, setMap] = useState({});
    useEffect(() => {
        let active = true;
        fetchClassifierOptions('tune-person-role-types').then(opts => {
            if (!active) return;
            const next = {};
            opts.forEach(o => { next[o.id] = o.title; });
            setMap(next);
        });
        return () => { active = false; };
    }, []);
    return map;
};

export default PersonResultCard;
