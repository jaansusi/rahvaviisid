import React from 'react';
import ListComponent from '../Components/ListComponent';
import { PersonModel } from '../Models';

const PersonsList = () => {
    return (
        <ListComponent model={PersonModel.list} />
    );
};

export default PersonsList;