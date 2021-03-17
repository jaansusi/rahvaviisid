import React from 'react';
import { Grid } from '@material-ui/core';
import './EditDataFragment.css';
import TunePlayer from '../Tunes/TunePlayer';
import FormInputComponent from '../Components/FormInputComponent';

const EditDataFragment = (({ model, formData, handleChange, extraComponent, index }) => {
    return (
        <>
            <Grid
                container
                direction='row'
            >
                {
                    // Create form fields based on the model
                    model.fields.map((modelField, i) => {
                        // There's no need to create an input for a value the user can't interact with
                        if (modelField.hidden)
                            return undefined;
                        // If the model field is defined as nested, create another handler function
                        // to-do: introduce recursion to allow for multiple levels of depth for nested models
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

                            // Array is a special case, it doesn't modify the inputs but multiplies them
                            if (modelField.type === 'array') {
                                let handleArrayChange = (event, i) => {
                                    const { name, value } = event.target;
                                    let temp = formData[modelField.field];
                                    temp[i][name] = value;
                                    handleChange({
                                        target: {
                                            name: modelField.field,
                                            value: temp,
                                            type: 'object'
                                        }
                                    });
                                };
                                let data = modelField.sortBy === undefined ? formData[modelField.field] : formData[modelField.field].sort((a,b) => a[modelField.sortBy] - b[modelField.sortBy])
                                return data.map((elem, i) =>
                                    <EditDataFragment key={i}
                                        model={modelField.nested}
                                        formData={elem}
                                        handleChange={handleArrayChange}
                                        index={i} />
                                );
                            }

                            // Return the data fragment created for the child model
                            return <EditDataFragment key={i}
                                model={modelField.nested}
                                formData={formData[modelField.field]}
                                handleChange={handleNestedChange} />;
                        }

                        // If the field does not have any children, return the form element for it.
                        return (
                            <FormInputComponent model={modelField} value={formData[modelField.field]} handleChange={handleChange} key={i} index={index} />
                        )
                    })
                }
                <Grid item xs={12}>
                    {
                        // to-do: Find a better alternative for inserting components here.
                        extraComponent !== undefined && extraComponent.includes('TunePlayer')
                            ? formData.tuneMelodies.sort((a,b) => a.variationIndex - b.variationIndex).map((elem, i) => <TunePlayer key={i} index={i} formData={formData} />)
                            : undefined
                    }
                </Grid>
            </Grid>
        </>
    );
});

export default EditDataFragment;