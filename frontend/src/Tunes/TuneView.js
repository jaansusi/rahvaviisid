import React from 'react';
import TunePlayer from './TunePlayer';
import ViewComponent from '../Components/ViewComponent';
import TuneModel from './TuneModel';
import { Grid } from '@material-ui/core';

const TuneView = () => {
    return (
        <Grid
            item>
            <ViewComponent mapping={TuneModel} />
            <TunePlayer />
        </Grid>
    );
};

export default TuneView;