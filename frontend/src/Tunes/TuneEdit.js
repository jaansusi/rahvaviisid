import React from 'react';
import TuneMap from './TuneMap';
import EditComponent from '../Components/EditComponent';
import { Grid } from '@material-ui/core';

const TuneEdit = (() => {
    return (
        <>
            <Grid item xs={6}>
                <EditComponent
                    filter='?filter={"include": ["tuneMelodies"]}'
                    mapping={TuneMap}
                    extraComponent={['TunePlayer']}
                />
            </Grid>

        </>
    );
});

export default TuneEdit;