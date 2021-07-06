import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ListComponent from '../ListComponent';
import { UserModel } from '../../Models';

const UsersList = () => {
    const { t } = useTranslation('common');
    return (
        <ListComponent model={UserModel.list} currentView='delete'
            additionalButtons={[<Button className='actionButton' variant="outlined" color="primary">{t('common.deactivate')}</Button>]}
            actionsWidth={350}
        />
    );
};

export default UsersList;