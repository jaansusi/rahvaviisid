import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Chip, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import VerifiedIcon from '@mui/icons-material/Verified';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import config from '../../../config';

const RefRow = ({ label, value, href }) => {
    if (!value) return null;
    return (
        <Stack direction='row' spacing={1} alignItems='baseline'>
            <Typography variant='caption' color='text.disabled' sx={{ minWidth: 88, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {label}
            </Typography>
            {href ? (
                <Stack direction='row' spacing={0.5} alignItems='center'>
                    <Typography variant='body2' sx={{ wordBreak: 'break-word' }}>{value}</Typography>
                    <Tooltip title={value}>
                        <Box component='a' href={href} target='_blank' rel='noreferrer' sx={{ color: 'primary.main', display: 'inline-flex' }}>
                            <LinkIcon fontSize='small' />
                        </Box>
                    </Tooltip>
                </Stack>
            ) : (
                <Typography variant='body2' sx={{ wordBreak: 'break-word' }}>{value}</Typography>
            )}
        </Stack>
    );
};

const looksLikeUrl = (s) => typeof s === 'string' && /^https?:\/\//i.test(s);

const formatDate = (raw) => {
    if (!raw) return null;
    try {
        return new Date(raw).toLocaleDateString();
    } catch { return raw; }
};

const ResultCard = ({ tune, editor, onChanged }) => {
    const { t } = useTranslation('common');
    const [deleting, setDeleting] = useState(false);

    const verified = Boolean(tune.verifiedBy);

    const handleDelete = () => {
        if (!window.confirm(t('action.confirmDeletion'))) return;
        setDeleting(true);
        axios
            .delete(`${config.apiUrl}/tunes/${tune.id}`)
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
                <Stack direction='row' spacing={1} alignItems='center' sx={{ mb: 1 }}>
                    <Typography
                        variant='subtitle1'
                        component={RouterLink}
                        to={`/viisid/${tune.id}/vaata`}
                        sx={{
                            fontWeight: 600,
                            color: 'primary.main',
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'underline' },
                        }}
                    >
                        {tune.tuneReference || `#${tune.id}`}
                    </Typography>
                    {verified && (
                        <Tooltip title={t('tune.verified')}>
                            <VerifiedIcon fontSize='small' color='primary' />
                        </Tooltip>
                    )}
                </Stack>
                <Stack spacing={0.5}>
                    <RefRow label={t('tune.tuneReference')}  value={tune.tuneReference} />
                    <RefRow label={t('tune.textReference')}  value={tune.textReference} />
                    <RefRow
                        label={t('tune.soundReference')}
                        value={tune.soundReference}
                        href={looksLikeUrl(tune.soundReference) ? tune.soundReference : null}
                    />
                    <RefRow
                        label={t('tune.videoReference')}
                        value={tune.videoReference}
                        href={looksLikeUrl(tune.videoReference) ? tune.videoReference : null}
                    />
                </Stack>
                {(tune.publications || tune.catalogue) && (
                    <Stack direction='row' spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
                        {tune.catalogue && <Chip size='small' variant='outlined' label={`${t('tune.catalogue')}: ${tune.catalogue}`} />}
                        {tune.publications && <Chip size='small' variant='outlined' label={tune.publications} />}
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
                <Typography variant='caption' color='text.disabled'>
                    {t('date.modified')}: {formatDate(tune.modified) || '—'}
                </Typography>
                <Stack direction='row' spacing={1}>
                    <Button
                        size='small'
                        variant='outlined'
                        component={RouterLink}
                        to={`/viisid/${tune.id}/vaata`}
                    >
                        {t('action.view')}
                    </Button>
                    {editor && (
                        <Button
                            size='small'
                            variant='outlined'
                            component={RouterLink}
                            to={`/viisid/${tune.id}/muuda`}
                        >
                            {t('action.edit')}
                        </Button>
                    )}
                </Stack>
                {editor && (
                    <Stack direction='row' spacing={0.5}>
                        <Tooltip title={t('tune.duplicate')}>
                            <IconButton
                                size='small'
                                component={RouterLink}
                                to={`/viisid/${tune.id}/kopeeri`}
                            >
                                <ContentCopyIcon fontSize='small' />
                            </IconButton>
                        </Tooltip>
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
                    </Stack>
                )}
            </Stack>
        </Paper>
    );
};

export default ResultCard;
