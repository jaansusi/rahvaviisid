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
                        currentModel.fields.forEach(modelElem => {
                            let fieldValue = modelElem.nested !== undefined ?
                                setData(data[modelElem.field], modelElem.nested, true) :
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
                    setData(result, model, false);
                }
            )
    }, [id, model, filter]);

    const handleSubmit = event => {
        event.preventDefault();
        setSubmitting(true);

        submitData(model, formData)
    };

    let submitData = (currentModel, data) => {
        // Since loopback does not want us sending any extra data (nested objects), 
        // let's collect all correctly cleaned objects in here
        // Note: we're currently assuming here that nesting only runs 1 level deep, to make it run deeper, recursion should be used
        let requestObjects = [];

        //Let's work on a copy of data
        let tempData = Object.assign({}, data);

        //Null all the empty values, so we don't anger the APIs model detection with unnecessary strings
        //to-do: this needs a rework
        for (let key in tempData) {
            if (tempData[key] === "") {
                tempData[key] = undefined;
            }
        }

        // Find all the nested elements, we need to patch them one by one
        for (let modelKey in currentModel.fields) {
            let modelElem = currentModel.fields[modelKey];
            if (modelElem !== undefined && modelElem.nested !== undefined) {
                //Add them to an array for later use and then purge the data object of them
                requestObjects.push({ model: modelElem.nested, dataElem: tempData[modelElem.field] });
                tempData[modelElem.field] = undefined;
            }
        }

        //Last, let's add the root object as well
        requestObjects.push({ model: currentModel, dataElem: tempData})

        // We can assume that all the DB entries already exist, we're just patching them so no need for synchronous requests.
        requestObjects.forEach((obj) => {
            fetch(config.apiUrl + '/' + obj.model.apiPath + '/' + obj.dataElem.id,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obj.dataElem)
                })
                .then(res => res.json())
                .then(resData => {
                    console.log(resData);
                });
        });

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
                <EditDataFragment model={model} formData={formData} handleChange={handleChange} extraComponent={extraComponent} />

                <Grid item xs className='form-edit-item'>
                    <Button type="submit" disabled={submitting} variant='contained' color='primary'>{t('edit.save')}</Button>
                </Grid>
            </form>
        </>
    )
});

export default EditComponent;