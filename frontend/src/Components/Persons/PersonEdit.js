import React from 'react';
import EditComponent from '../EditComponent';
import { PersonModel } from '../../Models';


const PersonEdit = ({ newItem }) => {
    return (
        <EditComponent 
        model = {PersonModel.edit}
        newItem = {newItem} />
    );
};

export default PersonEdit;