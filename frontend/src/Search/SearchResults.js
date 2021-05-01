import { Grid } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Actions from '../Components/Buttons/Actions';
import TuneModel from '../Models/TuneModel';


const SearchResults = ({ showAll, assets }) => {
  const { t } = useTranslation('common');
  let columns = TuneModel.list.fields.map((x) => {
    x.headerName = t(x.headerName);
    return x;
  });
  columns.push({ field: '', headerName: t('action.actions'), sortable: false, width: 290, renderCell: (params) => <Actions apiPath={'tunes'} id={params.row.id} /> });
  let tooManyAssets = assets.length > 25;
  let tempAssets = tooManyAssets && !showAll ? assets.splice(0, 25) : assets;
  return (
    <div style={{ width: '90vw' }}>
      <Grid>{ !showAll ? t('search.tooMany') : '' }</Grid>
      <DataGrid
        checkboxSelection
        rows={tempAssets}
        columns={columns}
        autoHeight
        pageSize={25}
         />
    </div>
  );
}

export default SearchResults;