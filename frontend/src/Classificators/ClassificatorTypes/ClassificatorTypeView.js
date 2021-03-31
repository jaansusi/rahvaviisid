import React from 'react';
import {
    useParams
} from 'react-router-dom';
import ViewComponent from '../../Components/ViewComponent';
import getClassificatorModel from './GetClassificatorModel';

const ClassificatorTypeView = () => {
    let { classificator } = useParams();

    return (
        <>
            <ViewComponent model={getClassificatorModel(classificator, 'view')} />
        </>
    );
};


export default ClassificatorTypeView;