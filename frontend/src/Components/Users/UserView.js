import React from 'react';
import ViewComponent from '../ViewComponent';
import { UserModel } from '../../Models';

const UserView = () => {
    return (
        <ViewComponent model={UserModel.view} noDelete={true} />
    );
};

export default UserView;