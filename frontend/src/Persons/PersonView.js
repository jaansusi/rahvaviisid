import React from 'react';
import ViewComponent from '../Components/ViewComponent';
import PersonModel from './PersonModel';

const PersonView = (() => {
    return (
        <ViewComponent modelping={PersonModel} />
    );
});

export default PersonView;