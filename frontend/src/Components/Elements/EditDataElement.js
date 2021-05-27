import { Button, Checkbox, Collapse, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DataService, TuneService } from '../../Services';
import EditDataFragment from '../Fragments/EditDataFragment';
import { PlayerViewComponent } from '../NewComponents';
import './Css/EditFormElement.css';


const EditDataElement = (({ model, elemValue, handleChange, index }) => {
    const { t } = useTranslation('common');
    let [expanded, setExpanded] = useState(-1);

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
            let handleElementChange = ((event, index) => {
                const { name, value } = event.target;
                handleChange({
                    name: model.field,
                    value: value.id
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
                    <FormControl className='form-input-element' variant='outlined'>
                        <InputLabel id={model.headerName}>{t(model.headerName)}</InputLabel>
                        <Select name={model.field} labelId={model.headerName} label={t(model.headerName)} variant="outlined"
                            style={{ backgroundColor: 'white' }} value={elemValue} onChange={(e) => handleElementChange(e, index)}>
                            <MenuItem value=''>{t('common.missing')}</MenuItem>
                            {
                                model.values.map(
                                    (elem, i) =>
                                        elem === undefined ?
                                            null :
                                            <MenuItem
                                                key={i}
                                                value={elem.id}>
                                                {
                                                    model.selector ?
                                                        Array.isArray(model.selector) ?
                                                            model.selector.map(x => elem[x]).join(' ') :
                                                            elem[model.selector] :
                                                        elem.title
                                                }
                                            </MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
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
                elemValue.push(DataService.CreateEmptyDataObject(model.edit.fields));
                console.log(elemValue);
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
                    <h3>{t(model.nested.label)}</h3>
                    <Button onClick={addEntryToTable} variant='outlined' color='primary'>{t('action.create')}</Button>
                    {JSON.stringify(elemValue)}
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
                                    elemValue.map((row, i) => {
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
                                                    <Button onClick={() => { setExpanded(i) }}>{t('action.edit')}</Button>
                                                    <Button onClick={() => { deleteEntryFromTable(i) }}>{t('action.delete')}</Button>
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
                let handleArrayChange = (event, i) => {
                    const { name, value } = event.target;
                    console.log(event);
                    let temp = elemValue;
                    temp[i][name] = value;
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
                return data.map((elemValue, i) =>
                    <EditDataFragment
                        title={t(model.nested.label) + ' ' + (i + 1)}
                        model={model.nested}
                        elementData={elemValue}
                        handleChange={(e) => handleArrayChange(e, i)}
                        key={i}
                    />
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
                <>
                    <Grid container direction='column'>
                        <Grid item>
                            <Button onClick={() => setExpanded(expanded * -1)}>Komplekteeritud ABC</Button>
                        </Grid>
                        <Grid item>
                            <Collapse in={expanded === 1} style={{ whiteSpace: 'pre-line' }}>{TuneService.CombineData(elemValue)}</Collapse>
                        </Grid>
                    </Grid>
                    <PlayerViewComponent elementData={elemValue} index={index} edit={true} />
                </>
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
                            label={t(model.headerName)}
                            value={model.selector ? elemValue[model.selector] : elemValue}
                            onChange={(e) => handleChange(e, index)}
                            style={{ backgroundColor: 'white' }}
                            variant='outlined' />
                    </FormControl>
                </Grid>
            );
    }

});

export default EditDataElement;