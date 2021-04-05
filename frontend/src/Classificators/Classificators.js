import React from 'react';
import {
    useParams
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Grid } from '@material-ui/core';
import ClassificatorsModel from '../Models/ClassificatorTypeModel';

const Classificators = () => {
    let { asset } = useParams();
    const { t } = useTranslation('common');
    return (
        <Grid item xs>
            <Grid container direction='column'>
                {
                    ClassificatorsModel.groups.map((group, i) => {
                        return (
                            <Grid item key={i}>
                                <h3>{t(group.name)}</h3>
                                <Grid container direction='row'>
                                    {
                                        group.models.map((model, j) => {
                                            return (<Button key={j} className='classificator-link' href={`${asset}/${model.url}`}>{t(model.name)}</Button>)
                                        })
                                    }
                                </Grid>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Grid>
    );
};

export default Classificators;