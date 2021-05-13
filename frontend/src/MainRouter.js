import React from 'react';
import PersonWrapper from './Persons/PersonWrapper';
import TuneWrapper from './Tunes/TuneWrapper';
import ClassificatorWrapper from './Classificators/ClassificatorWrapper';
import './App.css';
import {
    Redirect,
    Switch,
    useLocation,
    useParams
} from 'react-router-dom';
import UserWrapper from './Users/UserWrapper';

function MainRouter() {
    let { asset } = useParams();
    let { pathname } = useLocation();
    let wrapper = null;
    switch (asset) {
        case 'isikud':
            wrapper = <PersonWrapper />;
            break;
        case 'viisid':
            wrapper = <TuneWrapper />;
            break;
        case 'klassifikaatorid':
            wrapper = <ClassificatorWrapper />;
            break;
        case 'kasutajad':
            wrapper = <UserWrapper />;
            break;
        default:
            break;
    }
    return (
        <>
            <Switch>
                <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
            </Switch>
            { wrapper}
        </>
    );
}

export default MainRouter;
