import { Button, Grid } from '@material-ui/core';
import React, { useState, useEffect, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import {
    useParams
} from "react-router-dom";
import config from '../config';
import EditDataFragment from '../Fragments/EditDataFragment';


const EditComponent = (({ model, extraComponent, filter }) => {
    const { t } = useTranslation('common');
    const formReducer = (state, event) => {
        return {
            ...state,
            [event.name]: event.value
        }
    };
    let { id } = useParams();
    let createEmptyDataObject = currentModel => Object.fromEntries(new Map(currentModel.map((elem) => [elem.field, elem.nested === undefined ? '' : createEmptyDataObject(elem.nested.fields)])));
    let [formData, setFormData] = useReducer(formReducer, createEmptyDataObject(model.fields));

    let [submitting, setSubmitting] = useState(false);
    useEffect(() => {
        fetch(config.apiUrl + '/' + model.apiPath + '/' + id + filter)
            .then(res => res.json())
            .then(
                (result) => {
                    let setData = ((data, currentModel, nested) => {
                        let obj = {};
                        currentModel.forEach(modelElem => {
                            let fieldValue = modelElem.nested !== undefined ? 
                            setData(data[modelElem.field], modelElem.nested.fields, true) : 
                            data[modelElem.field] === null ? '' : data[modelElem.field];
                            if (!nested) {
                                setFormData({
                                    name: modelElem.field,
                                    value: fieldValue
                                });
                            }
                            obj[modelElem.field] = fieldValue;
                        });
                        return obj;
                    });
                    setData(result, model.fields, false);
                }
            )
    }, [id, model.apiPath, model.fields, filter]);

    const handleSubmit = event => {
        event.preventDefault();
        setSubmitting(true);
        
        
    };
    let submitData = (model, data) => {
        let dataToSubmit = data;
        let nestedModels = [];
        for (let key in dataToSubmit) {
            if (dataToSubmit[key] === "") {
                dataToSubmit[key] = undefined;
            }
        }
        fetch(config.apiUrl + '/' + model.apiPath + '/' + id + filter,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    setTimeout(() => {
        setSubmitting(false);
    }, 3000);
    };


    const handleChange = event => {
        const { name, value, type } = event.target;
        setFormData({
            name: name,
            value: type === 'number' ? parseInt(value, 10) : value,
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <EditDataFragment model={model} formData={formData} handleSubmit={handleSubmit} submitting={submitting} handleChange={handleChange} extraComponent={extraComponent} />
                {JSON.stringify(formData)}

                <Grid item xs className='form-edit-item'>
                    <Button type="submit" disabled={submitting} variant='contained' color='primary'>{t('edit.save')}</Button>
                </Grid>
            </form>
        </>
    )
});

export default EditComponent;