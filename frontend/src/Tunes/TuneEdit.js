import React from 'react';
import TunePlayer from './TunePlayer';
import TuneMap from './TuneMap';
import EditComponent from '../Components/EditComponent';

const TuneEdit = (() => {
    return (
        <>
            <EditComponent mapping={TuneMap} extraComponent={<TunePlayer editable={true} />} />
        </>
    );
});

export default TuneEdit;