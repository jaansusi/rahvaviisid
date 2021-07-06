import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AuditModel } from '../../Models';
import axios from 'axios';
import config from '../../config';
import { DataGrid } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@material-ui/core';

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
        axios.get(config.apiUrl + '/' + AuditModel.apiPath + '?filter=' + JSON.stringify({ 'include': [{relation:'actor'}], 'where': { 'entityId': id } }))
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
        <Grid item xs={11} container spacing={2} direction='column' alignItems='center'>
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
                    <Grid item container direction='row' spacing={3}>
                        <Grid item xs={1}>{t('audit.before')}</Grid>
                        <Grid item xs={11}>{activeEntry.before}</Grid>
                    </Grid> 
                    <Grid item container direction='row' spacing={3}>
                        <Grid item xs={1}>{t('audit.after')}</Grid>
                        <Grid item xs={11}>{activeEntry.after}</Grid>
                    </Grid> 
                </Grid>
                :
                <Grid><Typography variant='h2'>{t('audit.chooseOne')}</Typography></Grid>
            }
            <Grid item xs={12}>
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