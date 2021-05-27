import { Button, Grid } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthService } from '../../Services';
import Actions from '../Buttons/Actions';
import { TuneModel } from '../../Models';
import MassModification from './MassModification';


const SearchResults = ({ showAll, assets }) => {
  const { t } = useTranslation('common');
  let [selection, setSelection] = useState([]);
  let [modifying, setModifying] = useState(false);
  let columns = TuneModel.list.fields.map((x) => {
    x.headerName = t(x.headerName);
    return x;
  });
  let editAccess = AuthService.CanAccess(['editor', 'admin']);
  columns.push({ field: '', headerName: t('action.actions'), sortable: false, width: 290, renderCell: (params) => <Actions apiPath={'tunes'} id={params.row.id} auth={editAccess} pathOverride='viisid' /> });

  return (
    <Grid container direction='column'>
      {editAccess &&
        <Grid item>
          <Button
            disabled={selection.length === 0}
            onClick={() => { setModifying(!modifying); }}
            variant='contained'
          >
            {!modifying ? t('massMod.start') : t('massMod.backToAssets')}
          </Button>
        </Grid>
      }
      <Grid item>
        {
          modifying ?
            <MassModification assets={selection.map(x => assets[x - 1])} /> :
            <div style={{ width: '90vw' }}>
              <DataGrid
                checkboxSelection
                rows={assets}
                columns={columns}
                autoHeight
                pageSize={25}
                onSelectionModelChange={(selectedRows) => setSelection(selectedRows.selectionModel)}
              />
            </div>
        }
      </Grid>
    </Grid>
  );
}

export default SearchResults;