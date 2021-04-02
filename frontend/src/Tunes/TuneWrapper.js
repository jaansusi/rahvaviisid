import React from 'react';
import TunesList from './TunesList';
import TuneView from './TuneView';
import {
    Route
} from 'react-router-dom';
import 'abcjs/abcjs-audio.css';
import TuneEdit from './TuneEdit';

const TuneWrapper = () => {
    return (
        <>
            <Route exact path={'/:asset'}>
                <TunesList />
            </Route>
            <Route exact path={`/:asset/uus`}>
                <TuneEdit newItem={true} />
            </Route>
            <Route exact path={`/:asset/:id/vaata`}>
                <TuneView />
            </Route>
            <Route exact path={`/:asset/:id/muuda`}>
                <TuneEdit />
            </Route>
        </>
    );
}

export default TuneWrapper;