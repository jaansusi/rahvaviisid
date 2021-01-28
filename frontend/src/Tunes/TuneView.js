import React from 'react';
import TunePlayer from './TunePlayer';
import ViewComponent from '../Components/ViewComponent';
import TuneMap from './TuneMap';
import { Grid } from '@material-ui/core';

const TuneView = () => {
    return (
        <Grid
            item>
            <ViewComponent mapping={TuneMap} />
            <TunePlayer />
        </Grid>
    );
};

export default TuneView;