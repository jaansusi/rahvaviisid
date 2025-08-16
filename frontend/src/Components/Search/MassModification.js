import { Button, FormControl, Grid, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import config from '../../config';
import { TuneModel } from '../../Models';


const MassModification = ({ assets }) => {
  const { t } = useTranslation('common');
  let [selectedFields, setSelectedFields] = useState([]);
  let [selectedFieldsColumns, setSelectedFieldsColumns] = useState([]);
  let [selectedAssets, setSelectedAssets] = useState([]);
  let [isDone, setIsDone] = useState(false);
  let [submitting, setSubmitting] = useState(false);
  let [submitObject, setSubmitObject] = useState({});

  let pureFields = TuneModel.edit.fields
    .filter((x) => x.nested === undefined && !x.hidden);
  let modifiableFields = pureFields.map((x) => { x.id = x.field; x.headerName = t(x.headerName); return x; });
  modifiableFields.shift();

  let fieldColumns = [{ field: 'headerName', headerName: t('massMod.fieldHeader'), width: 300 }];

  let pidHeaderName = t('common.pid');
  useEffect(() => {
    setSelectedFieldsColumns(
      [{ field: 'pid', headerName: pidHeaderName, width: 200 }]
        .concat(selectedFields.map(x => {
          return {
            field: x,
            headerName: pureFields.filter(field => field.field === x)[0].headerName
          };
        })));
  }, [selectedFields, pidHeaderName]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);

    selectedAssets.map(x => assets[x]).forEach(asset => {
      axios
        .patch(
          config.apiUrl + '/tunes/' + asset.id,
          submitObject,
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        )
        .then((resData) => {
        });
    });

    setSubmitting(false);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    let obj = submitObject;
    obj[name] = value;
    setSubmitObject(obj);
  };

  return (
    <>
      <Grid item>
        <Button
          onClick={() => setIsDone(!isDone)}
          variant='contained'
          disabled={selectedFields.length === 0}
        >
          {isDone ? t('massMod.backToFields') : t('massMod.toValues')}
        </Button>
      </Grid>
      <Grid container direction='row'>
        {
          isDone ?
            <>
              <Grid item xs={3}>
                <form onSubmit={handleSubmit}>
                  {
                    selectedFieldsColumns.map((x, i) => {
                      return (
                        <Grid
                          item
                          xs={12}
                          className='form-edit-item'
                          key={i}
                        >
                          <FormControl className='form-input-element' variant='outlined'>
                            <TextField name={x.field} label={x.headerName} onChange={handleChange} variant='outlined' />
                          </FormControl>
                        </Grid>
                      );
                    })
                  }

                  <Grid item xs className="form-edit-item">
                    <Button
                      type="submit"
                      disabled={submitting}
                      variant="contained"
                      color="primary"
                    >
                      {t('edit.save')}
                    </Button>
                  </Grid>
                </form>
              </Grid>
              <Grid item xs={9}>
                <DataGrid
                  checkboxSelection
                  rows={assets}
                  columns={selectedFieldsColumns}
                  autoHeight
                  hideFooter
                  onSelectionModelChange={(selectedRows) => {
                    setSelectedAssets(selectedRows.selectionModel)
                  }}
                />
              </Grid>
            </>
            :
            <>
              <DataGrid
                checkboxSelection
                rows={modifiableFields}
                columns={fieldColumns}
                autoHeight
                hideFooter
                onSelectionModelChange={(selectedRows) => {
                  setSelectedFields(selectedRows.selectionModel)
                }}
              />
            </>
        }
      </Grid>
    </>
  )
}

export default MassModification;