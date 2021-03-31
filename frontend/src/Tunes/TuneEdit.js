import React from 'react';
import TuneModel from '../Models/TuneModel';
import EditComponent from '../Components/EditComponent';
import { Grid } from '@material-ui/core';

const TuneEdit = (({ newItem }) => {
    console.log(newItem);
    return (
        <>
            <Grid item xs={6}>
                <EditComponent
                    filter='{"include": ["tuneMelodies"]}'
                    model={TuneModel.edit}
                    extraComponent={['TunePlayer']}
                    newItem = {newItem}
                />
            </Grid>
        </>
    );
});

export default TuneEdit;