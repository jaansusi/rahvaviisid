import React from 'react';
import {
    useParams
} from 'react-router-dom';
import EditComponent from '../../Components/EditComponent';
import ClassificatorsMap from './ClassificatorTypeMap';

const ClassificatorTypeEdit = (() => {
    let { classificator } = useParams();

    let currentClassificatorMap = undefined;
    loop:
    for (let groupKey in ClassificatorsMap.groups) {
        let classificators = ClassificatorsMap.groups[groupKey].classificators
        for (let mapKey in classificators) {
            if (classificators[mapKey].url === classificator) {
                currentClassificatorMap = classificators[mapKey];
                break loop;
            }
        }
    }

    currentClassificatorMap.view = currentClassificatorMap.view !== undefined ?
        currentClassificatorMap.view : ClassificatorsMap.default.view;

    return (
        <>
            <EditComponent mapping={currentClassificatorMap} />
        </>
    );
});


export default ClassificatorTypeEdit;