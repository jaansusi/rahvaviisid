import React from 'react';
import {
    useParams
} from 'react-router-dom';
import EditComponent from '../../Components/EditComponent';
import getClassificatorModel from './GetClassificatorModel';

const ClassificatorTypeEdit = ({newItem}) => {
    let { classificator } = useParams();
    
    return (
        <EditComponent 
            model = {getClassificatorModel(classificator, 'edit')}
            newItem = {newItem} />
    );
};


export default ClassificatorTypeEdit;