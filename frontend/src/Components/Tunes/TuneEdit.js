import React from 'react';
import { TuneModel } from '../../Models';
import EditComponent from '../EditComponent';

const TuneEdit = ({ newItem }) => {
    return (
        <EditComponent
            model={TuneModel.edit}
            newItem={newItem}
            validateTune={true}
        />
    );
};

export default TuneEdit;