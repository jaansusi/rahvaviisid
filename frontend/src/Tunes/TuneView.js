import React from 'react';
import ViewComponent from '../Components/ViewComponent';
import TuneModel from '../Models/TuneModel';
import { Grid } from '@material-ui/core';

const TuneView = () => {
    return (
        <Grid
            item>
            <ViewComponent
                filter='{"include": ["tuneMelodies"]}'
                model={TuneModel.view}
                extraComponent={['TunePlayer']}
            />
        </Grid>
    );
};

export default TuneView;