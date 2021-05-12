import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ListComponent from '../Components/ListComponent';
import { UserModel } from '../Models';

const UsersList = () => {
    const { t } = useTranslation('common');
    return (
        <ListComponent model={UserModel.list} currentView='delete'
            additionalButtons={<Grid item><Button variant="outlined" color="primary">{t('common.deactivate')}</Button></Grid>}
            actionsWidth={350}
        />
    );
};

export default UsersList;