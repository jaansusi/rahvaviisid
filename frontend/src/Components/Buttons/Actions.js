import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { useTranslation } from "react-i18next";
import { useLocation } from 'react-router-dom';
import DeleteButton from './DeleteButton';

const Actions = (({ id, apiPath }) => {
    const { t } = useTranslation('common');
    let { pathname } = useLocation();
    let beforeInt = true;
    let path = pathname.split('/').map((elem, index) => {
        if (!isNaN(elem) && !isNaN(parseInt(elem)))
            beforeInt = false;
        if (!beforeInt)
            return undefined;
        return elem;
    }).filter(x => x !== undefined).join('/');
    return (
        <Grid container
        justify='space-around'>
            <Grid item>
                <Button href={`${path}/` + id + '/vaata'} variant="outlined" color="primary">{t('action.view')}</Button>
            </Grid>
            <Grid item>
                <Button href={`${path}/` + id + '/muuda'} variant="outlined" color="primary">{t('action.edit')}</Button>
            </Grid>
            <Grid item>
                <DeleteButton apiPath={apiPath} id={id} />
            </Grid>
        </Grid>
    );
});

export default Actions;