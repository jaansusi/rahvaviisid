import React from 'react';
import ViewComponent from '../ViewComponent';
import { PersonModel } from '../../Models';

const PersonView = () => {
    return (
        <ViewComponent model={PersonModel.view} />
    );
};

export default PersonView;