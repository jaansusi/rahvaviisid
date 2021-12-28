import React from 'react';
import {
    useParams
} from 'react-router-dom';
import EditComponent from '../../EditComponent';
import getClassificatorModel from './GetClassificatorModel';

const ClassificatorTypeEdit = ({newItem}) => {
    let { classificator } = useParams();
    
    return (
        <EditComponent 
            model = {getClassificatorModel(classificator, 'edit')}
            newItem = {newItem}
            noDelete = {true} />
    );
};


export default ClassificatorTypeEdit;