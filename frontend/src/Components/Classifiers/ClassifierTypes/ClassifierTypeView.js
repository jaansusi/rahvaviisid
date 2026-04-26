import React from 'react';
import {
    useParams
} from 'react-router-dom';
import ViewComponent from '../../ViewComponent';
import getClassifierModel from './GetClassifierModel';

const ClassifierTypeView = () => {
    let { classifier } = useParams();

    return (
        <ViewComponent
            model={getClassifierModel(classifier, 'view')}
            noDelete={true}
        />
    );
};


export default ClassifierTypeView;