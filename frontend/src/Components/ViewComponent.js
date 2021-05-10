import React, { useEffect, useReducer } from 'react';
import {
    useParams
} from "react-router-dom";
import ViewDataFragment from '../Fragments/ViewDataFragment';
import { Grid } from '@material-ui/core';
import Actions from './Buttons/Actions';
import { DataService } from '../Services';

const ViewComponent = ({ model }) => {
    let { id } = useParams();
    const formReducer = (state, event) => {
        return {
            ...state,
            [event.name]: event.value,
        };
    };
    let [formData, setFormData] = useReducer(
        formReducer,
        {}
    );
    useEffect(() => {
        console.log(model);
        DataService.RequestAsset(model, id, setFormData);
    }, [id, model]);
    return (
        <>
            <Actions apiPath={model.apiPath} id={id} currentView='view' />
            <Grid
                item
                xs>
                <ViewDataFragment model={model} elementData={formData} />        
            </Grid>
        </>
    );
};

export default ViewComponent;