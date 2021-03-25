import React from 'react';
import {
    useParams
} from 'react-router-dom';
import EditComponent from '../../Components/EditComponent';
import ClassificatorsModel from './ClassificatorTypeModel';

const ClassificatorTypeEdit = (() => {
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

    return (
        <>
            <EditComponent model={currentClassificatorModel} />
        </>
    );
});


export default ClassificatorTypeEdit;