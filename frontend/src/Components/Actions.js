import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { useTranslation } from "react-i18next";
import { useRouteMatch } from 'react-router-dom';
import DeleteButton from './DeleteButton';

const Actions = (({ id, apiPath }) => {
    const { t } = useTranslation('common');
    let { url } = useRouteMatch();
    return (
        
        <Grid container
        justify='space-around'>
            <Grid item>
                <Button href={`${url}/` + id} variant="outlined" color="primary">{t('action.view')}</Button>
            </Grid>
            <Grid item>
                <Button href={`${url}/` + id + '/muuda'} variant="outlined" color="primary">{t('action.edit')}</Button>
            </Grid>
            <Grid item>
                <DeleteButton apiPath={apiPath} id={id} />
            </Grid>
        </Grid>
    );
});

export default Actions;