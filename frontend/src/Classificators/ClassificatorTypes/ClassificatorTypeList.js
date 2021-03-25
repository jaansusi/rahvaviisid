import React from 'react';
import {
    useParams
} from 'react-router-dom';
import ListComponent from '../../Components/ListComponent';
import ClassificatorsModel from './ClassificatorTypeModel';

const ClassificatorTypeList = (() => {
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

    currentClassificatorModel.list = currentClassificatorModel.list !== undefined ?
        currentClassificatorModel.list : ClassificatorsModel.default.list;

    return (
        <>
            <ListComponent modelping={currentClassificatorModel} />
        </>
    );
});


export default ClassificatorTypeList;