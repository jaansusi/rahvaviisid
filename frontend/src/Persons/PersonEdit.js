import React from 'react';
import EditComponent from '../Components/EditComponent';
import PersonMap from './PersonMap';


const PersonEdit = (() => {
    return (
        <EditComponent map={PersonMap} />
    );
});

export default PersonEdit;