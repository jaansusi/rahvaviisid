import React from 'react';
import config from '../../config';
import { Button } from '@material-ui/core';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { toast } from 'react-toastify';

const DeleteButton = (({ apiPath, id }) => {
    const { t } = useTranslation('common');
    
    let deleteObject = () => {
        axios.delete(config.apiUrl + '/' + apiPath + '/' + id)
            .then(
                (result) => {
                    toast.success(t('action.deleted'));
                }
            );
    };

    return (
        <Button className='actionButton' href='#' onClick={() => {if(window.confirm(t('action.confirmDeletion'))){deleteObject()}}} variant='outlined' color='primary'>{t('action.delete')}</Button>
    );
});

export default DeleteButton;