import React from 'react';
import config from '../config';
import { Button } from '@material-ui/core';
import { useTranslation } from "react-i18next";

const DeleteButton = (({ apiPath, id }) => {
    const { t } = useTranslation('common');
    
    let deleteObject = () => {
        fetch(config.apiUrl + '/' + apiPath + '/' + id,
            {
                method: 'DELETE'
            })
            .then(
                (result) => {
                    console.log(result);
                }
            );
    }

    return (
        <Button href='#' onClick={deleteObject} color="primary">{t('action.delete')}</Button>
    )
});

export default DeleteButton;