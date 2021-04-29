import React from 'react';
import TuneModel from '../Models/TuneModel';
import EditComponent from '../Components/EditComponent';
import { Grid } from '@material-ui/core';

const TuneEdit = ({ newItem }) => {
    return (
        <>
            <Grid item xs={9}>
                <EditComponent
                    filter = '{"include": ["tuneMelodies"]}'
                    model = {TuneModel.edit}
                    newItem = {newItem}
                />
            </Grid>
        </>
    );
};

export default TuneEdit;