import { TextField } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Actions from '../Components/Buttons/Actions';
import TuneModel from '../Models/TuneModel';


const SearchResults = ({ assets }) => {
  const { t } = useTranslation('common');
  let columns = TuneModel.list.fields.map((x) => {
    x.headerName = t(x.headerName);
    return x;
  });
  columns.push({ field: '', headerName: t('action.actions'), sortable: false, width: 290, renderCell: (params) => <Actions apiPath={'tunes'} id={params.row.id} /> });

  return (
    <div style={{ width: '90vw', height: '500px' }}>
      <DataGrid
        rows={assets}
        columns={columns}
        pageSize={10} />
    </div>
  );
}

export default SearchResults;