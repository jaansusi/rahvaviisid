import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuditModel } from '../../Models';
import axios from 'axios';
import config from '../../config';
import { DataGrid } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@mui/material';

const TuneAudit = () => {
    const { t } = useTranslation('common');
    let { id } = useParams();
    let [logs, setLogs] = useState([]);
    let [activeEntry, setActiveEntry] = useState();
    let columns = AuditModel.list.fields.map((x) => {
        x.headerName = t(x.headerName);
        return x;
    });
    useEffect(() => {
        axios.get(config.apiUrl + '/' + AuditModel.apiPath + '?filter=' + JSON.stringify({ 'include': [{ relation: 'actor' }], 'where': { 'entityId': id } }))
            .then(
                (result) => {
                    setLogs(result.data.map((x => {
                        x.before = JSON.stringify(x.before);
                        x.after = JSON.stringify(x.after);
                        x.name = x.actor.firstName + ' ' + x.actor.lastName;
                        return x
                    })));
                }
            );
    }, [id]);
    return (
        <Grid item container spacing={2} direction='column' alignItems='center'>
            <Grid container item>
                {activeEntry ?
                    <Grid item container direction='column' alignItems='flex-start'>
                        <Grid item container direction='row' spacing={3}>
                            <Grid item xs={1}>{t('audit.action')}</Grid>
                            <Grid item xs={11}>{activeEntry.action}</Grid>
                        </Grid>
                        <Grid item container direction='row' spacing={3}>
                            <Grid item xs={1}>{t('audit.actedAt')}</Grid>
                            <Grid item xs={11}>{activeEntry.actedAt}</Grid>
                        </Grid>
                        <Grid item container direction='row' spacing={3}>
                            <Grid item xs={1}>{t('audit.actor')}</Grid>
                            <Grid item xs={11}>{activeEntry.actor?.firstName + ' ' + activeEntry.actor?.lastName}</Grid>
                        </Grid>
                        {
                            activeEntry.before !== '""' ?
                                <Grid item container direction='row' spacing={3}>
                                    <Grid item xs={1}>{t('audit.before')}</Grid>
                                    <Grid item xs={11}>{activeEntry.before}</Grid>
                                </Grid>
                                : null
                        }
                        {
                            activeEntry.after !== '""' ?
                                <Grid item container direction='row' spacing={3}>
                                    <Grid item xs={1}>{t('audit.after')}</Grid>
                                    <Grid item xs={11}>{activeEntry.after}</Grid>
                                </Grid>
                                : null
                        }
                    </Grid>
                    :
                    <Grid><Typography variant='h5'>{t('audit.chooseOne')}</Typography></Grid>
                }
            </Grid>
            <Grid item>
                <div style={{ width: '90vw', height: '500px' }}>
                    <DataGrid
                        columns={columns}
                        rows={logs}
                        onRowSelected={(e) => {
                            setActiveEntry(e.data);
                        }}
                    />
                </div>
            </Grid>
        </Grid>
    );
};

export default TuneAudit;