import React from 'react';
import ListComponent from '../ListComponent';
import { PersonModel } from '../../Models';
import { DataService } from '../../Services';

const PersonsList = () => {
    return (
        <ListComponent model={PersonModel.list} 
        filter={DataService.CreateIncludeFilter(PersonModel.list)} 
        />
    );
};

export default PersonsList;