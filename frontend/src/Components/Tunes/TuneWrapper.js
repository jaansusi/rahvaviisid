import React from 'react';
import TunesList from './TunesList';
import TuneView from './TuneView';
import {
    Routes,
    Route
} from 'react-router-dom';
import 'abcjs/abcjs-audio.css';
import TuneEdit from './TuneEdit';
import TuneAudit from './TuneAudit';

const TuneWrapper = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<TunesList />} />
                <Route path="/uus" element={<TuneEdit newItem={true} />} />
                <Route path="/:id/kopeeri" element={<TuneEdit copyItem={true} />} />
                <Route path="/:id/vaata" element={<TuneView />} />
                <Route path="/:id/muuda" element={<TuneEdit />} />
                <Route path="/:id/audit" element={<TuneAudit />} />
            </Routes>
        </>
    );
}

export default TuneWrapper;