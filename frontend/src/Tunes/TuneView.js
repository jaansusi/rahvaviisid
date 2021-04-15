import React from 'react';
import ViewComponent from '../Components/ViewComponent';
import TuneModel from '../Models/TuneModel';
import { Grid } from '@material-ui/core';

const TuneView = () => {
    return (
        <Grid
            item xs={9}>
            <ViewComponent
                model={TuneModel.view}
            />
        </Grid>
    );
};

export default TuneView;