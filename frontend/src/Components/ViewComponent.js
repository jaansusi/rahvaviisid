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
    let [assetData, setAssetData] = useReducer(
        formReducer,
        {}
    );
    let [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        DataService.RequestAsset(model, id)
            .then(asset => {
                for (const key in asset) {
                    setAssetData({
                        'name': key,
                        'value': asset[key]
                    });
                }
            })
            .then(() => setIsLoading(false));
    }, [id, model]);
    return (
        isLoading ?
            <Grid item>
                <BarLoader css='display: block; margin: 50px auto;' />
            </Grid> :
            <>
                <Actions apiPath={model.apiPath} id={id} currentView='view' />
                <Grid item>
                    <ViewDataFragment model={model} elementData={assetData} />
                </Grid>
            </>
    );
};

export default ViewComponent;