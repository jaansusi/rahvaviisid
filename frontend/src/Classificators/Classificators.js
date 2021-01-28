import React from 'react';
import {
    useRouteMatch
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Grid } from '@material-ui/core';
import ClassificatorsMap from './ClassificatorTypes/ClassificatorTypeMap';

const Classificators = (() => {
    let { path } = useRouteMatch();
    const { t } = useTranslation('common');
    return (
        <Grid item xs>
            <Grid container direction='column'>
                {
                    ClassificatorsMap.groups.map((group, i) => {
                        return (
                            <Grid item key={i}>
                                <h3>{t(group.name)}</h3>
                                <Grid container direction='row'>
                                    {
                                        group.classificators.map((classificator, j) => {
                                            return (<Button key={j} className='classificator-link' href={`${path}/${classificator.url}`}>{t(classificator.name)}</Button>)
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
});

export default Classificators;