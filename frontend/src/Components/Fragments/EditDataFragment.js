import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import './EditDataFragment.css';
import EditDataElement from '../Elements/EditDataElement';

const EditDataFragment = ({
    model,
    elementData,
    handleChange,
    index,
    title,
}) => {
    return (
        <Grid container direction='column'>
            <Typography variant='h4'>{title !== undefined ? title : null}</Typography>
            <Grid container direction='row'>
                {
                    // Create form fields based on the model
                    model.fields.map((modelField, i) => {
                        // There's no need to create an input for a value the user can't interact with
                        if (modelField.hidden) return null;

                        if (modelField.type === 'player') {
                            return (
                                <EditDataElement
                                    key={i}
                                    model={modelField}
                                    elemValue={elementData}
                                    handleChange={handleChange}
                                    index={index}
                                />
                            );
                        }

                        // If the model field is defined as nested, create another handler function
                        // to-do: introduce recursion to allow for multiple levels of depth for nested models
                        if (modelField.nested !== undefined) {
                            let handleNestedChange = (event) => {
                                const { name, value } = event.target;
                                let temp = elementData[modelField.field];
                                temp[name] = value;
                                handleChange({
                                    target: {
                                        name: modelField.field,
                                        value: temp,
                                        type: 'object',
                                    },
                                });
                            };

                            // Return the data element created for the child model
                            return (
                                <EditDataElement
                                    key={i}
                                    model={modelField}
                                    elemValue={elementData[modelField.field]}
                                    handleChange={handleNestedChange}
                                />
                            );
                        }

                        // If the field does not have any children, return the form element for it.
                        return (
                            <EditDataElement
                                key={i}
                                model={modelField}
                                elemValue={elementData[modelField.field]}
                                handleChange={handleChange}
                                index={index}
                            />
                        );
                    })
                }
            </Grid>
        </Grid>
    );
};

export default EditDataFragment;
