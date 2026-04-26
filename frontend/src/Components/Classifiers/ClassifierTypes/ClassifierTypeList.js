import React from 'react';
import {
    useParams
} from 'react-router-dom';
import { DataService } from '../../../Services';
import ListComponent from '../../ListComponent';
import getClassifierModel from './GetClassifierModel';

const ClassifierTypeList = () => {
    let { classifier } = useParams();
    let model = getClassifierModel(classifier, 'list');
    return (
        <ListComponent
            model={model}
            filter={DataService.CreateIncludeFilter(model)}
            currentView='delete'
        />
    );
};


export default ClassifierTypeList;