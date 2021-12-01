import { Button, Checkbox, Collapse, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DataService, TuneService } from '../../Services';
import EditDataFragment from '../Fragments/EditDataFragment';
import { PlayerViewComponent } from '../NewComponents';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './Css/EditFormElement.css';

const EditDataElement = (({ model, elemValue, handleChange, index }) => {
    const { t } = useTranslation('common');
    let [expanded, setExpanded] = useState(-1);
    if (model.timestamp)
        elemValue = DataService.ParseDate(elemValue);

    useEffect(() => { }, [elemValue]);

    switch (model.type) {
        case 'boolean':
            return (
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={elemValue}
                            onChange={(e) => {
                                let a = {
                                    target: {
                                        name: model.field,
                                        value: e.target.checked,
                                        type: 'boolean'
                                    }
                                }
                                handleChange(a, index);
                            }}
                            name={model.field}
                            value={elemValue}
                            color="primary"
                        />
                    }
                    label={t(model.headerName)}
                />
            );
        case 'textbox':
            return (
                <Grid
                    item
                    xs={12}
                    className='form-edit-item'
                >
                    <FormControl className='form-input-element' variant='outlined'>
                        <TextField name={model.field} label={t(model.headerName)} value={elemValue} onChange={(e) => handleChange(e, index)}
                            style={{ backgroundColor: 'white' }} multiline fullWidth rows='2' variant='outlined' />
                    </FormControl>
                </Grid>
            );
        case 'dropdown':
            let handleElementChange = ((index, newValue) => {
                handleChange({
                    target: {
                        name: model.field,
                        value: newValue?.id
                    }
                }, index);
            });
            if (model.values === undefined)
                return null;
            return (
                <Grid
                    item
                    xs={4}
                    className='form-edit-item'
                >
                    <Autocomplete
                        options={model.values}
                        getOptionLabel={
                            (option) => model.title ?
                                Array.isArray(model.title) ?
                                    model.title.map(x => option[x]).join(' ') :
                                    option[model.title] :
                                option.title
                        }
                        value={model.values.filter(x => x.id === elemValue)[0]}
                        getOptionSelected={(option) => elemValue === option.id}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label={t(model.headerName)}
                            />
                        )}
                        onChange={(_event, newValue) => handleElementChange(index, newValue)}
                        style={{ backgroundColor: 'white' }}
                    />
                </Grid>
            );
        case 'multiselect':
            let handleMultiChange = ((newValues) => {
                console.log(newValues);
                handleChange({
                    target: {
                        name: model.field,
                        value: newValues
                    }
                }, index);
            });
            if (model.values === undefined)
                model.values = [];
            console.log(elemValue);
            return (
                <Grid
                    item
                    xs={4}
                    className='form-edit-item'
                >
                    <Autocomplete
                        multiple
                        options={
                            model.values
                        }
                        getOptionLabel={
                            (option) => option === undefined ? '' :
                                model.title ?
                                    Array.isArray(model.title) ?
                                        model.title.map(x => option[x]).join(' ') :
                                        option[model.title] :
                                    option.title
                        }
                        value={
                            elemValue ?
                                elemValue.map(elem =>
                                    model.values.find(x => (model.selector ? x[model.selector] : x.id) === elem.id)
                                ) :
                                []
                        }
                        getOptionSelected={
                            (option) => elemValue.map(x => x.id).includes(option.id)
                        }
                        filterSelectedOptions
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label={t(model.headerName)}
                            />
                        )}
                        onChange={(event, newValues) =>
                            handleMultiChange(newValues)
                        }
                        style={{ backgroundColor: 'white' }}
                    />
                </Grid>
            );
        case 'staticMultiselect':
            let handleStaticMultiChange = ((newValues) => {
                handleChange({
                    target: {
                        name: model.field,
                        value: newValues.map(x => x.value)
                    }
                }, index);
            });
            if (model.values === undefined)
                model.values = [];
            return (
                <Grid
                    item
                    xs={4}
                    className='form-edit-item'
                >
                    <Autocomplete
                        multiple
                        options={
                            model.values
                        }
                        getOptionLabel={
                            (option) => option === undefined ? '' :
                                option.title
                        }
                        value={
                            elemValue ?
                                elemValue.map(elem =>
                                    model.values.find(x => x.value === elem)
                                ) :
                                []
                        }
                        getOptionSelected={
                            (option) => elemValue.includes(option.value)
                        }
                        filterSelectedOptions
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label={t(model.headerName)}
                            />
                        )}
                        onChange={(event, newValues) =>
                            handleStaticMultiChange(newValues)
                        }
                        style={{ backgroundColor: 'white' }}
                    />
                </Grid>
            );
        case 'view':
            return (
                <Grid
                    item
                    xs={4}
                    className='form-edit-item'
                >
                    <FormControl className='form-input-element' variant='outlined'>
                        <TextField disabled name={model.field} label={t(model.headerName)} value={elemValue} onChange={(e) => handleChange(e, index)}
                            style={{ backgroundColor: 'white' }} variant='outlined' />
                    </FormControl>
                </Grid>
            );
        case 'table':
            let addEntryToTable = () => {
                setExpanded(elemValue.length);
                elemValue.push(DataService.SyncCreateEmptyDataObject(model.edit.fields));
            };
            let deleteEntryFromTable = (i) => {
                if (expanded === i)
                    setExpanded(-1);
                else
                    setExpanded(i)
                elemValue.splice(i, 1);
            };
            let handleRowChange = (event, index) => {
                const { name, value } = event.target;
                let temp = elemValue;
                let selector = model.edit.fields.filter(x => x.field === name)[0].selector;
                console.log(model.edit.fields.filter(x => x.field === name)[0].values);
                console.log(event.target);

                if (temp[index][name] === undefined) {
                    if (model.edit.fields.filter(x => x.field === name)[0].array)
                        temp[index][name] = [];
                    else
                        temp[index][name] = {};
                }
                if (selector !== undefined) {
                    temp[index][name][selector] = value;
                } else {
                    temp[index][name] = value;
                }

                handleChange({
                    target: {
                        name: model.field,
                        value: temp,
                    },
                });
            }
            return (
                <Grid
                    item
                    xs={12}
                >
                    <Typography variant='h5'>{t(model.nested.label)}</Typography>
                    <Button onClick={addEntryToTable} variant='outlined' color='primary'>{t('action.create')}</Button>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {
                                        model.nested.fields.map((field, i) => {
                                            return (<TableCell align={i === 0 ? 'left' : 'right'} key={i}>{t(field.headerName)}</TableCell>);
                                        })
                                    }
                                    <TableCell>{t('action.actions')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    elemValue?.map((row, i) => {
                                        return (expanded === i) ?
                                            <TableRow key={i}>
                                                <TableCell colSpan={model.nested.fields.length + 1}>
                                                    <EditDataFragment
                                                        model={model.edit}
                                                        elementData={row}
                                                        handleChange={(e) => handleRowChange(e, i)}
                                                    />
                                                    <Button onClick={() => { setExpanded(-1) }} variant='outlined' color='primary'>{t('action.close')}</Button>
                                                </TableCell>
                                            </TableRow>
                                            :
                                            <TableRow key={i}>
                                                {
                                                    model.nested.fields.map((field, j) => {
                                                        return (
                                                            <TableCell align={j === 0 ? 'left' : 'right'} key={j}>
                                                                {
                                                                    row[field.field] !== undefined ?
                                                                        (
                                                                            field.selector ?
                                                                                (
                                                                                    Array.isArray(field.selector) ?
                                                                                        field.selector.map(x => row[field.field][x]).join(' ')
                                                                                        :
                                                                                        row[field.field][field.selector]
                                                                                )
                                                                                :
                                                                                row[field.field]
                                                                        )
                                                                        :
                                                                        ''
                                                                }
                                                            </TableCell>
                                                        );
                                                    })
                                                }
                                                <TableCell>
                                                    <Button onClick={() => { setExpanded(i) }} variant='outlined' color='primary'>{t('action.edit')}</Button>
                                                    <Button onClick={() => { deleteEntryFromTable(i) }} variant='outlined' color='primary'>{t('action.delete')}</Button>
                                                </TableCell>
                                            </TableRow>
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            );
        case 'model':
            if (model.array) {
                if (elemValue === undefined)
                    elemValue = [];
                let handleArrayChange = (event, i) => {
                    let temp = elemValue;
                    if (temp === undefined)
                        temp = [];
                    // If event is undefined then remove the element
                    if (event === undefined) {
                        temp.splice(i, 1);
                    } else {
                        // If the element in array doesn't exist, create one
                        if (temp[i] === undefined)
                            temp[i] = DataService.SyncCreateEmptyDataObject(model.nested.fields);
                        // Otherwise modify the value based on the event
                        else {
                            const { name, value } = event.target;
                            temp[i][name] = value;
                        }
                    }

                    // Finally, send the "new" modified object up the chain
                    // Note: it has to be a new object, otherwise React doesn't know something changed
                    handleChange({
                        target: {
                            name: model.field,
                            value: temp,
                            type: 'object',
                        },
                    });
                };

                let data =
                    model.sortBy === undefined
                        ? elemValue
                        : elemValue.sort((a, b) => a[model.sortBy] - b[model.sortBy]);
                return (
                    <Grid item>
                        <Typography variant='h4'>{model.label !== undefined ? t(model.label) : null}</Typography>
                        <Button onClick={() => handleArrayChange({}, elemValue.length)} variant='outlined' color='primary'>{t('action.create')}</Button>

                        {
                            data?.map((elemValue, i) =>
                                <Grid item key={i}>
                                    <EditDataFragment
                                        title={t(model.nested.label) + ' ' + (i + 1)}
                                        deleteButton={<Button onClick={() => { handleArrayChange(undefined, i) }} variant='outlined' color='primary'>{t('action.delete')}</Button>}
                                        model={model.nested}
                                        elementData={elemValue}
                                        handleChange={(e) => handleArrayChange(e, i)}
                                    />
                                </Grid>
                            )
                        }
                    </Grid>
                );
            }
            else
                return (
                    <>
                        {model.label ? t(model.label) : null}
                        <EditDataFragment
                            model={model.nested}
                            elementData={elemValue}
                        />
                    </>
                );
        case 'player':
            return (
                <Grid item>
                    <Grid item container direction='column'>
                        <Grid item>
                            <Button onClick={() => setExpanded(expanded * -1)}>Komplekteeritud ABC</Button>
                        </Grid>
                        <Grid item>
                            <Collapse in={expanded === 1} style={{ whiteSpace: 'pre-line' }}>{TuneService.CombineData(elemValue)}</Collapse>
                        </Grid>
                    </Grid>
                    <PlayerViewComponent elementData={elemValue} index={index} edit={true} />
                </Grid>
            );
        default:
            return (
                <Grid
                    item
                    xs={4}
                    className='form-edit-item'
                >
                    <FormControl className='form-input-element' variant='outlined'>
                        <TextField
                            name={model.field}
                            error={model.type === 'number' ? isNaN(elemValue) : false}
                            inputProps={model.type === 'number' ? { inputMode: 'numeric', pattern: '[0-9]*' } : undefined}
                            helperText={model.type === 'number' && elemValue.length > 0 && isNaN(elemValue) ? t('validation.mustBeNumber') : undefined}
                            label={t(model.headerName)}
                            value={model.selector ? elemValue[model.selector] : elemValue}
                            required={model.required}
                            onChange={(e) => handleChange(e, index)}
                            style={{ backgroundColor: 'white' }}
                            variant='outlined' />
                    </FormControl>
                </Grid>
            );
    }

});

export default EditDataElement;