import React from 'react';
import {
    useParams
} from 'react-router-dom';
import { DataService } from '../../../Services';
import ListComponent from '../../ListComponent';
import getClassificatorModel from './GetClassificatorModel';

const ClassificatorTypeList = () => {
    let { classificator } = useParams();
    let model = getClassificatorModel(classificator, 'list');
    return (
        <ListComponent
            model={model}
            filter={DataService.CreateIncludeFilter(model)}
        />
    );
};


export default ClassificatorTypeList;