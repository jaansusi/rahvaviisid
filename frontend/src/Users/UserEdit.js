import React from 'react';
import EditComponent from '../Components/EditComponent';
import { UserModel } from '../Models';


const UserEdit = ({ newItem }) => {
    return (
        <EditComponent 
        model = {UserModel.edit}
        newItem = {newItem} />
    );
};

export default UserEdit;