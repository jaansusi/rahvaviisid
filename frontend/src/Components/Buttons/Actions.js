import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { useTranslation } from "react-i18next";
import { useLocation } from 'react-router-dom';
import DeleteButton from './DeleteButton';
import { AuthService } from '../../Services';
import './ActionButton.css';

const Actions = (({ id, apiPath, auth, pathOverride, currentView, additionalButtons, justify, spacing }) => {
    const { t } = useTranslation('common');
    let { pathname } = useLocation();
    let beforeInt = true;

    let path = pathname.split('/').map(elem => {
        if (!isNaN(elem) && !isNaN(parseInt(elem)))
            beforeInt = false;
        if (!beforeInt)
            return undefined;
        return elem;
    }).filter(x => x !== undefined).join('/');
    if (pathOverride)
        path = pathOverride;
    if (auth === undefined)
        auth = AuthService.CanAccess(['editor', 'admin']);
    if (justify === undefined)
        justify = 'space-between';
    return (
        <Grid container item xs={12}
        justify='flex-end'>
            <Grid container item
                justify={justify}
                spacing={spacing ? 2 : undefined}
            >
                {
                    additionalButtons?.map((button, i) =>
                        <Grid item key={i}>
                            {button}
                        </Grid>
                    )
                }
                {currentView !== 'view' && <Grid item><Button className='actionButton' href={`${path}/` + id + '/vaata'} variant="outlined" color="primary">{t('action.view')}</Button></Grid>}
                {auth &&
                    <>
                        {currentView !== 'edit' && <Grid item><Button className='actionButton' href={`${path}/` + id + '/muuda'} variant="outlined" color="primary">{t('action.edit')}</Button></Grid>}
                        {currentView !== 'delete' && <Grid item><DeleteButton apiPath={apiPath} id={id} /></Grid>}
                    </>
                }
            </Grid>
        </Grid>
    );
});

export default Actions;