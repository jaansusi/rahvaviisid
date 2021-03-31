import React from 'react';
import {
    useParams
} from 'react-router-dom';
import ListComponent from '../../Components/ListComponent';
import getClassificatorModel from './GetClassificatorModel';

const ClassificatorTypeList = () => {
    let { classificator } = useParams();

    return (
        <>
            <ListComponent model={getClassificatorModel(classificator, 'list')} />
        </>
    );
};


export default ClassificatorTypeList;