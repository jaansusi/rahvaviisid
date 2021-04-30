import { Grid } from '@material-ui/core';
import React from 'react';
import { useTranslation } from "react-i18next";
import SearchComponent from '../Search/SearchComponent';

const Home = (() => {
    const { t } = useTranslation('common');

    return (
        <Grid item ws={10}>
            <div>{t('home.home')}</div>
            <SearchComponent />
        </Grid>
    );
})

export default Home;