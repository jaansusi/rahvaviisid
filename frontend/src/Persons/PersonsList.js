import React from 'react';
import ListComponent from '../Components/ListComponent';
import PersonModel from '../Models/PersonModel';

const PersonsList = () => {
    return (
        <ListComponent model={PersonModel.list} />
    );
};

export default PersonsList;