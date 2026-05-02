import React from 'react';
import PersonWrapper from './Components/Persons/PersonWrapper';
import TuneWrapper from './Components/Tunes/TuneWrapper';
import ClassifierLegacyRedirect from './Components/Classifiers/ClassifierLegacyRedirect';
import './App.css';
import {
    Navigate,
    useLocation,
    useParams
} from 'react-router-dom';

function AssetRouter() {
    let { asset } = useParams();
    let { pathname, search } = useLocation();

    if (pathname.endsWith('/') && pathname.length > 1) {
        return <Navigate to={pathname.slice(0, -1) + search} replace />;
    }

    let wrapper = null;
    switch (asset) {
        case 'isikud':
            wrapper = <PersonWrapper />;
            break;
        case 'viisid':
            wrapper = <TuneWrapper />;
            break;
        case 'klassifikaatorid':
            wrapper = <ClassifierLegacyRedirect />;
            break;
        case 'kasutajad': {
            const target = pathname.replace(/^\/kasutajad/, '/halda/kasutajad');
            return <Navigate to={target + search} replace />;
        }
        default:
            break;
    }
    return wrapper;
}

export default AssetRouter;
