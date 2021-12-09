import React from 'react';
import { TuneModel } from '../../Models';
import { TuneService } from '../../Services';
import EditComponent from '../EditComponent';

const TuneEdit = ({ newItem }) => {
    return (
        <EditComponent
            model={TuneModel.edit}
            newItem={newItem}
            validate={TuneService.Validate}
        />
    );
};

export default TuneEdit;