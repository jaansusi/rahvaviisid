import React from 'react';
import ListComponent from '../Components/ListComponent';
import PersonMap from './PersonMap';

const PersonsList = () => {
    return (
        <ListComponent mapping={PersonMap} />
    );
};

export default PersonsList;