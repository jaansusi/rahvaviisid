import { Button, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
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
  let actionsWidth = editAccess ? 3 * 125 : 150;
  columns.push({
    field: '', headerName: t('action.actions'), sortable: false, width: actionsWidth,
    renderCell: (params) => <Actions apiPath={'tunes'} id={params.row.id} auth={editAccess} pathOverride='viisid' />
  });

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
                rowsPerPageOptions = {[]}
                onSelectionModelChange={(selectedRows) => setSelection(selectedRows.selectionModel)}
                componentsProps={{
                  pagination: {
                    labelRowsPerPage: t('datagrid.labelRowsPerPage'),
                    labelDisplayedRows:
                      ({ from, to, count }) => {
                        return '' + from + '-' + to + t('datagrid.of') + count
                      }
                  }
                }}
              />
            </div>
        }
      </Grid>
    </Grid>
  );
}

export default SearchResults;