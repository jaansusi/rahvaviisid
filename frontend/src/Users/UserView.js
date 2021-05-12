import React from 'react';
import ViewComponent from '../Components/ViewComponent';
import { UserModel } from '../Models';

const UserView = () => {
    return (
        <ViewComponent model={UserModel.view} />
    );
};

export default UserView;