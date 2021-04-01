import React from 'react';
import { Button } from '@material-ui/core';
import { useTranslation } from "react-i18next";
import { useLocation } from 'react-router-dom';

const DeleteButton = (({ apiPath }) => {
    const { t } = useTranslation('common');
    const location = useLocation();
    return (
        <Button href={location.pathname + '/uus'} variant='outlined' color='primary'>{t('action.create')}</Button>
    )
});

export default DeleteButton;