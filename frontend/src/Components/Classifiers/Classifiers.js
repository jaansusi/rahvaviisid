import React from 'react';
import { useTranslation } from "react-i18next";
import { Button, Divider, Grid, Typography } from '@mui/material';
import { ClassifiersModel } from '../../Models';

const Classifiers = () => {
    const { t } = useTranslation('common');
    return (
        <Grid item xs>
            <Grid container direction='column'>
                {
                    ClassifiersModel.groups.map((group, i) => {
                        return (
                            <Grid item key={i}>
                                <Typography variant='h5'>{t(group.name)}</Typography>
                                <Grid container direction='row' spacing={1}>
                                    {
                                        group.models.map((model, j) => {
                                            return (
                                                <Grid item key={j}>
                                                    <Button className='classifier-link' href={`/halda/klassifikaatorid/${model.url}`} variant='outlined'>{t(model.name)}</Button>
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

export default Classifiers;