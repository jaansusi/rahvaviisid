import React from 'react';
import { useTranslation } from "react-i18next";
import { Grid } from '@material-ui/core';
import './Footer.css';

const Footer = () => {
    const { t } = useTranslation('common');

    return (
        <Grid
            container
            id='footer-container'
            alignItems='center'
            justify='center'
        >
            <Grid item>
                {t('common.footer')}
            </Grid>
        </Grid>
    );
};



export { Footer };