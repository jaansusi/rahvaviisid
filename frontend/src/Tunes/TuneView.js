import React from 'react';
import TunePlayer from './TunePlayer';
import ViewComponent from '../Components/ViewComponent/ViewComponent';
import TuneMap from './TuneMap';

const TuneView = (() => {
    return (
        <>
            <ViewComponent map={TuneMap} />
            <TunePlayer />
        </>
    );
});

export default TuneView;