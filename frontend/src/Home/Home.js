import React from 'react';
import { useTranslation } from "react-i18next";

const Home = (() => {
    const { t } = useTranslation('common');

    return (
        <div>{t('home.home')}</div>
    );
})

export default Home;