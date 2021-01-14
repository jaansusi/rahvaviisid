import React from 'react';
import { Button } from '@material-ui/core';
import { useTranslation } from "react-i18next";
import { useRouteMatch } from 'react-router-dom';

const Actions = (({ id }) => {
    const { t } = useTranslation('common');
    let { url } = useRouteMatch();
    return (
        <>
            <Button href={`${url}/` + id} color="primary">{t('action.view')}</Button>
            <Button href={`${url}/` + id + '/muuda'} color="primary">{t('action.edit')}</Button>
            <Button href='#' color="primary">{t('action.delete')}</Button>
        </>
    );
});

export default Actions;