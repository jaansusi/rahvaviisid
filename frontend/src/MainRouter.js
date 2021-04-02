import React from 'react';
import PersonWrapper from './Persons/PersonWrapper';
import TuneWrapper from './Tunes/TuneWrapper';
import ClassificatorWrapper from './Classificators/ClassificatorWrapper';
import './App.css';
import {
    useParams
} from 'react-router-dom';

function MainRouter() {
    let { asset } = useParams();
    switch (asset) {
        case 'isikud':
            return <PersonWrapper />;
        case 'viisid':
            return <TuneWrapper />;
        case 'klassifikaatorid':
            return <ClassificatorWrapper />;
        default:
            return null;
    }
}

export default MainRouter;
