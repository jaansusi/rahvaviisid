import React from 'react';
import {
    withRouter
} from 'react-router-dom';
import { Divider, Grid, Typography } from "@material-ui/core"
import { useTranslation } from 'react-i18next';

const LocationHeader = ({ location }) => {
    const { t } = useTranslation('common');
    const separator = ' - ';
    const path = location.pathname.slice(1).split('/');
    //Special case
    if (path[0] === 'login')
        return null;
    let translatedString = '';
    if (path.length > 2) {
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
        <Grid container justify='flex-start' item xs={11}>
            <Grid item xs={12}>
                <Typography variant='h5'>
                    {translatedString}
                </Typography>
                <Divider />
            </Grid>
        </Grid>
    );
}

export default withRouter(LocationHeader);