import React from 'react';
import TunePlayer from './TunePlayer';
import ViewComponent from '../Components/ViewComponent';
import TuneMap from './TuneMap';

const TuneView = () => {
    return (
        <>
            <TunePlayer />
            <ViewComponent mapping={TuneMap} />
        </>
    );
};

export default TuneView;