import React from 'react';
import EditComponent from '../Components/EditComponent';
import PersonModel from './PersonModel';


const PersonEdit = (() => {
    return (
        <EditComponent modelping={PersonModel} />
    );
});

export default PersonEdit;