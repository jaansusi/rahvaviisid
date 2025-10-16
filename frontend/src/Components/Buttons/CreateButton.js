import React from 'react';
import { Button } from '@mui/material';
import { useTranslation } from "react-i18next";
import { useLocation } from 'react-router-dom';

const CreateButton = (({ url }) => {
    const { t } = useTranslation('common');
    const location = useLocation();
    return (
        <Button href={url === undefined ? location.pathname + '/uus' : url} variant='outlined' color='primary'>{t('action.create')}</Button>
    );
});

export default CreateButton;