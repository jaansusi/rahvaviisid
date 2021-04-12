import React from 'react';
import ViewComponent from '../Components/ViewComponent';
import TuneModel from '../Models/TuneModel';
import { Grid } from '@material-ui/core';
import { createIncludeFilter } from '../Components/ComponentHelpers';

const TuneView = () => {
    let filter = createIncludeFilter(TuneModel.view);
    return (
        <Grid
            item xs={9}>
            <ViewComponent
                filter={filter}
                model={TuneModel.view}
            />
        </Grid>
    );
};

export default TuneView;