import { TextField } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Actions from '../Components/Buttons/Actions';
import TuneModel from '../Models/TuneModel';


const MassModification = ({ assets }) => {
  const { t } = useTranslation('common');
  return (
      <>{JSON.stringify(assets)}</>
  )
}

export default MassModification;