import { Button, FormControl, Grid, TextField } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import config from '../config';
import { TuneModel } from '../Models';


const MassModification = ({ assetIds }) => {
  const { t } = useTranslation('common');
  let [selectedFields, setSelectedFields] = useState([]);
  let [isDone, setIsDone] = useState(false);
  let [submitting, setSubmitting] = useState(false);
  let [submitObject, setSubmitObject] = useState({});
  let modifiableFields = TuneModel.edit.fields
    .filter((x) => x.nested === undefined && !x.hidden).map((x) => { x.id = x.field; x.headerName = t(x.headerName); return x; });

  let columns = [{ field: 'headerName', headerName: t('massMod.fieldHeader'), width: 300 }]
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);

    assetIds.forEach(id => {
      axios
        .patch(
          config.apiUrl + '/tunes/' + id,
          submitObject,
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        )
        .then((resData) => {
          console.log(resData);
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
      <Grid>
        <Button
          onClick={() => setIsDone(!isDone)}
          variant='contained'
          disabled={selectedFields.length === 0}
        >
          {isDone ? t('massMod.backToFields') : t('massMod.toValues')}
        </Button>
      </Grid>
      {
        isDone ?
          <form onSubmit={handleSubmit}>
            {
              selectedFields.map((x, i) => {
                return (
                  <Grid
                    item
                    xs={4}
                    className='form-edit-item'
                    key={i}
                  >
                    <FormControl className='form-input-element' variant='outlined'>
                      <TextField name={x} label={t(x)} onChange={handleChange} variant='outlined' />
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
          :
          <>
            <DataGrid
              checkboxSelection
              rows={modifiableFields}
              columns={columns}
              autoHeight
              hideFooter
              onSelectionModelChange={(selectedRows) => {
                console.log(selectedRows)
                setSelectedFields(selectedRows.selectionModel)
              }}
            />
          </>
      }
    </>
  )
}

export default MassModification;