import React, { useEffect, useReducer, useState } from 'react';
import {
    useParams
} from "react-router-dom";
import ViewDataFragment from './Fragments/ViewDataFragment';
import { Grid } from '@material-ui/core';
import Actions from './Buttons/Actions';
import { DataService } from '../Services';
import BarLoader from 'react-spinners/BarLoader';

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
    let [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        console.log(model);
        DataService.RequestAsset(model, id, setFormData, setIsLoading);
    }, [id, model]);
    return (
        isLoading ?
            <Grid item>
                <BarLoader css='display: block; margin: 50px auto;' />
            </Grid> :
            <>
                <Actions apiPath={model.apiPath} id={id} currentView='view' />
                <Grid item>
                    <ViewDataFragment model={model} elementData={formData} />
                </Grid>
            </>
    );
};

export default ViewComponent;