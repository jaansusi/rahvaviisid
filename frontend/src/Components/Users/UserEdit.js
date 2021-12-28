import React from 'react';
import EditComponent from '../EditComponent';
import { UserModel } from '../../Models';


const UserEdit = () => {
    return (
        <EditComponent
            model={UserModel.edit}
            noDelete={true}
        />
    );
};

export default UserEdit;