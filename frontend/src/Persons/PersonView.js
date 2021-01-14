import React from 'react';
import ViewComponent from '../Components/ViewComponent';
import PersonMap from './PersonMap';

const PersonView = (() => {
    return (
        <ViewComponent map={PersonMap} />
    );
});

export default PersonView;