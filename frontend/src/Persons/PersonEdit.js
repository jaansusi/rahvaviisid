import React from 'react';
import EditComponent from '../Components/EditComponent';
import PersonModel from '../Models/PersonModel';


const PersonEdit = (() => {
    return (
        <EditComponent model={PersonModel.edit} />
    );
});

export default PersonEdit;