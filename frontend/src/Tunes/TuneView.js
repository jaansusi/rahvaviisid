import React from 'react';
import TunePlayer from './TunePlayer';
import ViewComponent from '../Components/ViewComponent/ViewComponent';
import TuneMap from './TuneMap';

const TuneView = (() => {
    return (
        <>
            <TunePlayer />
            <ViewComponent map={TuneMap} />
        </>
    );
});

export default TuneView;