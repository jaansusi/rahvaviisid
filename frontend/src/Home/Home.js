import { Grid } from '@material-ui/core';
import React from 'react';
import { useTranslation } from "react-i18next";

const Home = (() => {
    const { t } = useTranslation('common');

    return (
        <Grid item ws={10}>
            <div>{t('home.home')}</div>
        </Grid>
    );
})

export default Home;