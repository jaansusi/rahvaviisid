import React from 'react';
import {
    useParams
} from 'react-router-dom';
import EditComponent from '../../EditComponent';
import getClassifierModel from './GetClassifierModel';

const ClassifierTypeEdit = ({newItem}) => {
    let { classifier } = useParams();

    return (
        <EditComponent
            model = {getClassifierModel(classifier, 'edit')}
            newItem = {newItem}
            noDelete = {true} />
    );
};


export default ClassifierTypeEdit;