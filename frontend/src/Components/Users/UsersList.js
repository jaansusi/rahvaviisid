import React from 'react';
import ListComponent from '../ListComponent';
import { UserModel } from '../../Models';

const UsersList = () => {
    return (
        <ListComponent
            model={UserModel.list}
            currentView='delete'
        />
    );
};

export default UsersList;