import React from 'react';
import PersonWrapper from './Components/Persons/PersonWrapper';
import TuneWrapper from './Components/Tunes/TuneWrapper';
import UserWrapper from './Components/Users/UserWrapper';
import ClassifierWrapper from './Components/Classifiers/ClassifierWrapper';
import './App.css';
import {
    Navigate,
    useLocation,
    useParams
} from 'react-router-dom';

function AssetRouter() {
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
            wrapper = <ClassifierWrapper />;
            break;
        case 'kasutajad':
            wrapper = <UserWrapper />;
            break;
        default:
            break;
    }
    return (
        <>
            {pathname.endsWith('/') && pathname.length > 1 && <Navigate to={pathname.slice(0, -1)} replace />}
            { wrapper }
        </>
    );
}

export default AssetRouter;
