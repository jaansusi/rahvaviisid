import React from 'react';
import EditComponent from '../EditComponent';
import { UserModel } from '../../Models';

const UserCreate = () => {
    return (
        <EditComponent
            model={UserModel.create}
            newItem={true} />
    );
};

export default UserCreate;