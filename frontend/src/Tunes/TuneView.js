import React from 'react';
import ViewComponent from '../Components/ViewComponent';
import TuneModel from './TuneModel';
import { Grid } from '@material-ui/core';

const TuneView = () => {
    return (
        <Grid
            item>
            <ViewComponent model={TuneModel.view} />
        </Grid>
    );
};

export default TuneView;