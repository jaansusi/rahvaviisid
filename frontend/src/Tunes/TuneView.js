import React from 'react';
import ViewComponent from '../Components/ViewComponent';
import TuneModel from '../Models/TuneModel';
import { Grid } from '@material-ui/core';

const TuneView = () => {
    let filter = {
        include: [
            {
                relation: "tuneTranscriptions",
                scope: {
                    include: [
                        { relation: "tuneMelodies" }
                    ]
                }
            }
        ]
    };
    return (
        <Grid
            item xs={9}>
            <ViewComponent
                filter={filter}
                model={TuneModel.view}
                extraComponent={['TunePlayer']}
            />
        </Grid>
    );
};

export default TuneView;