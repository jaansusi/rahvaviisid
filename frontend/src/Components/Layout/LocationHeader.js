import React from 'react';
import {
    useLocation
} from 'react-router-dom';
import { Divider, Grid, Typography } from "@mui/material"
import { useTranslation } from 'react-i18next';

const LocationHeader = () => {
    const { t } = useTranslation('common');
    const location = useLocation();
    const separator = ' - ';
    const path = location.pathname.slice(1).split('/');
    //Special cases
    if (['', 'login', 'otsing'].includes(path[0]))
        return null;
    let translatedString = '';
    if (path.length > 2 && path[path.length-1] !== 'uus') {
        path.pop();
        let id = path.pop();
        translatedString = [
            ...path.map(x => t('location.' + x)),
            'ID: ' + id
        ].join(separator);
    } else if (path[0] !== '') {
        translatedString = path.map(x => t('location.' + x)).join(separator);
    }
    return (
        <Grid container item xs={11} style={{ marginBottom: 10 }}>
            <Grid item xs={12}>
                <Typography variant='h4'>
                    {translatedString}
                </Typography>
            <Divider />
            </Grid>
        </Grid>
    );
}

export default LocationHeader;