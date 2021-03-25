import React from 'react';
import ListComponent from '../Components/ListComponent';
import PersonModel from './PersonModel';

const PersonsList = () => {
    return (
        <ListComponent model={PersonModel} />
    );
};

export default PersonsList;