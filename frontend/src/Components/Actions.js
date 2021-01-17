import React from 'react';
import { Button } from '@material-ui/core';
import { useTranslation } from "react-i18next";
import { useRouteMatch } from 'react-router-dom';
import DeleteButton from './DeleteComponent';

const Actions = (({ id, apiPath }) => {
    const { t } = useTranslation('common');
    let { url } = useRouteMatch();
    return (
        <>
            <Button href={`${url}/` + id} color="primary">{t('action.view')}</Button>
            <Button href={`${url}/` + id + '/muuda'} color="primary">{t('action.edit')}</Button>
            <DeleteButton apiPath={apiPath} id={id} />
        </>
    );
});

export default Actions;