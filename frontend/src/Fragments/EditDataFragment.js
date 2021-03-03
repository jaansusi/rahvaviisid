import React from 'react';
import { Grid } from '@material-ui/core';
import './EditDataFragment.css';
import TunePlayer from '../Tunes/TunePlayer';
import FormInputComponent from '../Components/FormInputComponent';

const EditDataFragment = (({ model, formData, handleChange, extraComponent }) => {
    return (
        <>
            <Grid
                container
                direction='row'
            >
                {
                    //Create form fields based on the model
                    model.fields.map((modelField, i) => {
                        if (modelField.hidden)
                            return undefined;
                        if (modelField.nested !== undefined) {
                            let handleNestedChange = event => {
                                const { name, value } = event.target;
                                let temp = formData[modelField.field];
                                temp[name] = value;
                                handleChange({
                                    target: {
                                        name: modelField.field,
                                        value: temp,
                                        type: 'object'
                                    }
                                });
                            };
                            return <EditDataFragment key={i}
                                model={modelField.nested}
                                formData={formData[modelField.field]}
                                handleChange={handleNestedChange} />;
                        }

                        return (
                                <FormInputComponent model={modelField} value={formData[modelField.field]} handleChange={handleChange} key={i} />
                        )
                    })
                }
                <Grid item xs={12}>
                    {
                        //to-do: Find a better alternative for inserting components here.
                        extraComponent !== undefined && extraComponent.includes('TunePlayer')
                            ? <TunePlayer editable={true} formData={formData} handleChange={handleChange} />
                            : undefined
                    }
                </Grid>
            </Grid>
        </>
    );
});

export default EditDataFragment;