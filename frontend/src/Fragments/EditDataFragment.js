import React from 'react';
import { Grid } from '@material-ui/core';
import './EditDataFragment.css';
import TunePlayer from '../Tunes/TunePlayer';
import FormInputComponent from '../Components/FormInputComponent';
import { useTranslation } from 'react-i18next';

const EditDataFragment = ({
    model,
    formData,
    handleChange,
    extraComponent,
    index,
    title,
}) => {
    const { t } = useTranslation('common');
    return (
        <>
            <Grid container direction='column'>
                <h4>{title !== undefined ? title : null}</h4>
                <Grid container direction='row'>
                    {
                        // Create form fields based on the model
                        model.fields.map((modelField, i) => {
                            // There's no need to create an input for a value the user can't interact with
                            if (modelField.hidden) return null;
                            // In addition, if the value for some reason is undefined, don't do anything
                            if (formData[modelField.field] === undefined)
                                return null;

                            // If the model field is defined as nested, create another handler function
                            // to-do: introduce recursion to allow for multiple levels of depth for nested models
                            if (modelField.nested !== undefined) {
                                let handleNestedChange = (event) => {
                                    const { name, value } = event.target;
                                    let temp = formData[modelField.field];
                                    temp[name] = value;
                                    handleChange({
                                        target: {
                                            name: modelField.field,
                                            value: temp,
                                            type: 'object',
                                        },
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
                                                type: 'object',
                                            },
                                        });
                                    };
                                    let data =
                                        modelField.sortBy === undefined
                                            ? formData[modelField.field]
                                            : formData[modelField.field].sort((a, b) => a[modelField.sortBy] - b[modelField.sortBy]);
                                    return data.map((elem, j) =>
                                        <EditDataFragment
                                            model={modelField.nested}
                                            formData={elem}
                                            handleChange={handleArrayChange}
                                            key={'viewfragment' + i + j}
                                            index={j}
                                            title={t('tune.variationTitle') + (j + 1)}
                                            extraComponent={
                                                modelField.extraComponent === 'TunePlayer' ?
                                                    <TunePlayer
                                                        formData={formData}
                                                        index={j}
                                                    />
                                                    : undefined
                                            }
                                        />
                                    );
                                }

                                // Return the data fragment created for the child model
                                return (
                                    <EditDataFragment
                                        model={modelField.nested}
                                        formData={formData[modelField.field]}
                                        handleChange={handleNestedChange}
                                    />
                                );
                            }

                            // If the field does not have any children, return the form element for it.
                            return (
                                <FormInputComponent
                                    key={modelField.field}
                                    model={modelField}
                                    value={formData[modelField.field]}
                                    handleChange={handleChange}
                                    index={index}
                                />
                            );
                        })
                    }
                </Grid>
                {
                    extraComponent !== undefined ?
                        <Grid item>
                            {extraComponent}
                        </Grid> :
                        null
                }
            </Grid>
        </>
    );
};

export default EditDataFragment;
