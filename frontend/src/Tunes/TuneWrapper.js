import React from 'react';
import TunesList from './TunesList';
import TuneView from './TuneView';
import {
    Route,
    useRouteMatch
} from 'react-router-dom';
import 'abcjs/abcjs-audio.css';
import TuneEdit from './TuneEdit';

const TuneWrapper = () => {
    let { path, url } = useRouteMatch();
    return (
        <>
            <Route exact path={url}>
                <TunesList />
            </Route>
            <Route exact path={`${path}/uus`}>
                <TuneEdit newItem={true} />
            </Route>
            <Route exact path={`${path}/:id/vaata`}>
                <TuneView />
            </Route>
            <Route exact path={`${path}/:id/muuda`}>
                <TuneEdit />
            </Route>
        </>
    );
}

export default TuneWrapper;