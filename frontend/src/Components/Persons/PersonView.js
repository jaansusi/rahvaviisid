import React from 'react';
import ViewComponent from '../ViewComponent';
import { PersonModel } from '../../Models';
import { Grid } from '@mui/material';

const PersonView = () => {
    return (
        <Grid xs={12}>
            <ViewComponent model={PersonModel.view} />
        </Grid>
    );
};

export default PersonView;