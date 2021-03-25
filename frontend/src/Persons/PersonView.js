import React from 'react';
import ViewComponent from '../Components/ViewComponent';
import PersonModel from './PersonModel';

const PersonView = (() => {
    return (
        <ViewComponent model={PersonModel.view} />
    );
});

export default PersonView;