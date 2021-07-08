import React from 'react';
import {
    useParams
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Divider, Grid, Typography } from '@material-ui/core';
import { ClassificatorsModel } from '../../Models';

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
                                <Typography variant='h5'>{t(group.name)}</Typography>
                                <Grid container direction='row' spacing={1}>
                                    {
                                        group.models.map((model, j) => {
                                            return (
                                                <Grid item key={j}>
                                                    <Button className='classificator-link' href={`${asset}/${model.url}`} variant='outlined'>{t(model.name)}</Button>
                                                </Grid>
                                            );
                                        })
                                    }
                                </Grid>
                                <Divider style={{ marginTop: 5 }} />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Grid>
    );
};

export default Classificators;