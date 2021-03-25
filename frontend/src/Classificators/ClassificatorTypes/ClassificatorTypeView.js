import React from 'react';
import {
    useParams
} from 'react-router-dom';
import ViewComponent from '../../Components/ViewComponent';
import ClassificatorsModel from './ClassificatorTypeModel';

const ClassificatorTypeView = (() => {
    let { classificator } = useParams();

    let currentClassificatorModel = undefined;
    loop:
    for (let groupKey in ClassificatorsModel.groups) {
        let classificators = ClassificatorsModel.groups[groupKey].classificators
        for (let modelKey in classificators) {
            if (classificators[modelKey].url === classificator) {
                currentClassificatorModel = classificators[modelKey];
                break loop;
            }
        }
    }

    currentClassificatorModel.view = currentClassificatorModel.view !== undefined ?
        currentClassificatorModel.view : ClassificatorsModel.default.view;

    console.log(currentClassificatorModel);
    return (
        <>
            <ViewComponent modelping={currentClassificatorModel} />
        </>
    );
});


export default ClassificatorTypeView;