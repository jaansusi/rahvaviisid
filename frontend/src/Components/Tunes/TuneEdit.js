import React from 'react';
import { TuneModel } from '../../Models';
import EditComponent from '../EditComponent';

const TuneEdit = ({ newItem, copyItem }) => {
    return (
        <EditComponent
            model={TuneModel.edit}
            newItem={newItem}
            copyItem={copyItem}
            validateTune={true}
        />
    );
};

export default TuneEdit;