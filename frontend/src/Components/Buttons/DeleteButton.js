import React from 'react';
import config from '../../config';
import { Button } from '@material-ui/core';
import { useTranslation } from "react-i18next";
import axios from 'axios';

const DeleteButton = (({ apiPath, id }) => {
    const { t } = useTranslation('common');
    
    let deleteObject = () => {
        axios.delete(config.apiUrl + '/' + apiPath + '/' + id)
            .then(
                (result) => {
                    console.log(result);
                }
            );
    };

    return (
        <Button href='#' onClick={deleteObject} variant='outlined' color='primary'>{t('action.delete')}</Button>
    );
});

export default DeleteButton;