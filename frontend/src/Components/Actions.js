import React, { useState, useEffect } from 'react';
import {
    Link
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import './Actions.css';

const Actions = (({ url, id }) => {
    const { t, i18n } = useTranslation('common');
    return (
        <>
            <Link className='action-link' to={`${url}/` + id}>{t('action.view')}</Link>
            <Link className='action-link' to={`${url}/edit/` + id}>{t('action.edit')}</Link>
        </>
    );
});

export default Actions;