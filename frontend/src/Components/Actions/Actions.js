import React from 'react';
import {
    Link
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import './Actions.css';

const Actions = (({ url, id }) => {
    const { t } = useTranslation('common');
    return (
        <>
            <Link className='action-link' to={`${url}/` + id}>{t('action.view')}</Link>
            <Link className='action-link' to={`${url}/` + id + '/muuda'}>{t('action.edit')}</Link>
        </>
    );
});

export default Actions;