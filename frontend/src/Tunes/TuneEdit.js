import React from 'react';
import TuneModel from './TuneModel';
import EditComponent from '../Components/EditComponent';
import { Grid } from '@material-ui/core';

const TuneEdit = (() => {
    return (
        <>
            <Grid item xs={6}>
                <EditComponent
                    filter='?filter={"include": ["tuneMelodies"]}'
                    mapping={TuneModel}
                    extraComponent={['TunePlayer']}
                />
            </Grid>

        </>
    );
});

export default TuneEdit;