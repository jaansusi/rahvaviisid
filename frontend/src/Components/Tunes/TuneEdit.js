import React from 'react';
import { TuneModel } from '../../Models';
import EditComponent from '../EditComponent';
import { Grid } from '@material-ui/core';

const TuneEdit = ({ newItem }) => {
    return (
        <Grid item xs={9}>
            <EditComponent
                model={TuneModel.edit}
                newItem={newItem}
            />
        </Grid>
    );
};

export default TuneEdit;