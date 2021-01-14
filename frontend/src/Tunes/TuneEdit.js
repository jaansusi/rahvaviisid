import React from 'react';
import TunePlayer from './TunePlayer';
import TuneMap from './TuneMap';
import EditComponent from '../Components/EditComponent';

const TuneEdit = (() => {
    return (
        <>
            <EditComponent map={TuneMap} />
            <TunePlayer editable={true} />
        </>
    );
});

export default TuneEdit;