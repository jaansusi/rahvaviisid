import React from 'react';
import { Grid, Typography } from '@mui/material';
import './EditDataFragment.css';
import EditDataElement from '../Elements/EditDataElement';

const EditDataFragment = ({
    model,
    elementData,
    deleteButton,
    handleChange,
    index,
    title,
}) => {
    return (
        <Grid item container direction='column' xs={12}>
            <Grid item container direction='row' margin={2}>
                <Grid item xs={2}>
                    <Typography variant='h5'>{title !== undefined ? title : null}</Typography>
                </Grid>
                <Grid item xs={2}>
                    {
                        deleteButton
                    }
                </Grid>
            </Grid>


            <Grid container direction='row'>
                {
                    // Create form fields based on the model
                    model.fields.map((modelField, i) => {
                        // There's no need to create an input for a value the user can't interact with
                        if (modelField.hidden) return null;
                        if (modelField.type && (modelField.type === 'table' || modelField.type.array) && elementData[modelField.field] === undefined) {
                            handleChange({
                                target: {
                                    name: modelField.field,
                                    value: [],
                                    type: 'object',
                                },
                            });
                            return null;
                        }

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

                        let handleElementChange = (event) => {
                            const { name, value } = event.target;
                            let type = undefined;
                            let temp = value;
                            if (typeof value === 'object' && !Array.isArray(value)) {
                                type = 'object';
                                temp = {...elementData, [name]: value};
                            }
                            handleChange({
                                target: {
                                    name: modelField.field,
                                    value: temp,
                                    type: type,
                                },
                            });
                        };
                        // If the model field is defined as nested, create another handler function
                        // to-do: introduce recursion to allow for multiple levels of depth for nested models
                        if (modelField.nested !== undefined) {
                            // Array model fields manage their own state via handleArrayChange
                            // and send complete arrays — don't wrap in handleNestedChange
                            // which would spread the array into an object
                            if (modelField.array) {
                                return (
                                    <EditDataElement
                                        key={i}
                                        model={modelField}
                                        elemValue={elementData[modelField.field]}
                                        handleChange={handleElementChange}
                                        index={index}
                                    />
                                );
                            }

                            let handleNestedChange = (event) => {
                                const { name, value } = event.target;
                                let temp = elementData[modelField.field] !== undefined
                                    ? {...elementData[modelField.field]}
                                    : {};
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
                                handleChange={handleElementChange}
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
